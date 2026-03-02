const inputStyles = new CSSStyleSheet();

inputStyles.replaceSync(`
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .container.sm {
    max-width: 124px;
  }

  .container.md {
    max-width: 319px;
  }

  .container.sm input {
    height: 26px;
  }

  .container.invalid * {
    color: var(--color-error, #ff3b30);
  }

  .title-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 18px;
    margin-bottom: 14px;
  }

  .title {
    font-size: 12px;
    color: var(--color-text-primary, #a6a6a6);
  }

  .input-wrapper {
    position: relative;
  }

  .aside {
    position: absolute;
    top: 0;
    right: 0;
    color: var(--color-text-primary, #a6a6a6);
  }

  .input {
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    color: var(--color-text-secondary, #595959);
    border: none;
    border-bottom: 1px solid var(--color-text-placeholder, #f2f2f2);
    outline: none;
    letter-spacing: 1px;
    caret-color: var(--color-primary, #ff335f);
  }

  .input::placeholder {
    color: var(--color-text-placeholder, #f2f2f2);
  }

  .container.invalid .input {
    border-bottom: 1px solid var(--color-error, #ff3b30);
  }

  .input:focus {
    border-bottom: 1px solid var(--color-border-hover, #ff335f);
  }

  @media (hover: hover) {
    .input:hover {
      border-bottom: 1px solid var(--color-border-hover, #ff335f);
    }
  }

  .error {
    min-height: 1rem;
    margin-top: 4px;
    font-size: 12px;
    color: var(--color-error, #ff3b30);
  }
`);

class UIInput extends HTMLElement {
  private container: HTMLDivElement | null = null;
  private input: HTMLInputElement | null = null;
  private error: HTMLSpanElement | null = null;
  private validators: Record<string, string | boolean | null> = {};
  public customMask: ((target: HTMLInputElement) => void) | null = null;
  public customValidation: ((value: string) => string) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (!this.shadowRoot) return;

    this.shadowRoot.adoptedStyleSheets = [inputStyles];

    const size = this.getAttribute("size") || "md";
    const aside = this.getAttribute("aside");
    const title = this.getAttribute("title") ?? "";
    const placeholder = this.getAttribute("placeholder") ?? "";

    this.shadowRoot.innerHTML = `<div class="container ${size}">
      <div class="title-wrapper">
        <span class="title">${title}</span>
        <slot name="title-aside"></slot>
      </div>
      <div class="input-wrapper">
        <input type="text" class="input" placeholder="${placeholder}" />
        ${aside ? `<span class="aside">${aside}</span>` : ""}
      </div>
      <span class="error"></span>
    </div>`;

    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validators = this.getValidators();
  }

  private handleInput(e: Event): void {
    const target = e.target as HTMLInputElement;

    if (this.customMask) {
      this.customMask(target);
    }

    if (this.error) {
      this.error.textContent = "";
    }

    if (this.container) {
      this.container.classList.remove("invalid");
    }
  }

  private handleBlur(): void {
    if (!this.error || !this.container) return;

    const { error, isValid } = this.validate();

    if (!isValid) {
      this.error.textContent = error;
      this.container.classList.add("invalid");
      return;
    }

    this.container.classList.remove("invalid");
    this.container.classList.add("valid");
  }

  public connectedCallback(): void {
    this.container = this.shadowRoot?.querySelector(".container") ?? null;
    this.input = this.shadowRoot?.querySelector(".input") ?? null;
    this.error = this.shadowRoot?.querySelector(".error") ?? null;

    if (!this.input || !this.error || !this.container) return;

    this.input.addEventListener("input", this.handleInput);
    this.input.addEventListener("blur", this.handleBlur);
  }

  public disconnectedCallback(): void {
    if (this.input) {
      this.input.removeEventListener("input", this.handleInput);
      this.input.removeEventListener("blur", this.handleBlur);
    }
  }

  public validateAndShowError(): boolean {
    const { isValid } = this.validate();
    this.handleBlur();

    return isValid;
  }

  public validate(): { isValid: boolean; error: string } {
    const value = this.input?.value ?? "";
    let error = "";

    if (value && this.customValidation) {
      error = this.customValidation(value);
    }

    if (this.validators.required && !value) {
      error = "Поле обязательно";
    }

    const notEmail =
      this.validators.email &&
      !!value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (notEmail) {
      error = "Неверный Email";
    }

    return {
      isValid: error === "",
      error,
    };
  }

  private getValidators(): Record<string, string | boolean | null> {
    return {
      required: this.hasAttribute("required"),
      email: this.hasAttribute("email"),
    };
  }

  public get value(): string | undefined {
    return this.input?.value;
  }
}

customElements.define("ui-input", UIInput);

export default UIInput;
