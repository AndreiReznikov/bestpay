const textareaStyles = new CSSStyleSheet();

textareaStyles.replaceSync(`
  .container {
    display: flex;
    flex-direction: column;
    max-width: 319px;
    width: 100%;
  }

  .container.invalid * {
    color: var(--color-error, #ff3b30);
  }

  .container.invalid .textarea {
    border-bottom: 1px solid var(--color-error, #ff3b30);
  }

  .title {
    margin-bottom: 14px;
    font-size: 12px;
    color: var(--color-text-primary, #a6a6a6);
  }

  .textarea {
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    color: var(--color-text-secondary, #595959);
    border: none;
    border-bottom: 1px solid var(--color-border, #f2f2f2);
    outline: none;
    letter-spacing: 0;
    caret-color: var(--color-primary, #ff335f);
    resize: none;
  }

  .textarea::placeholder {
    color: var(--color-text-placeholder, #f2f2f2);
  }

  @media (hover: hover) {
    .textarea:hover {
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

class UITextarea extends HTMLElement {
  container: HTMLDivElement | null = null;
  textarea: HTMLTextAreaElement | null = null;
  error: HTMLSpanElement | null = null;
  validators: Record<string, string | boolean | null> = {};
  customValidation: ((value: string) => string) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (!this.shadowRoot) return;

    const title = this.getAttribute("title") ?? "";
    const placeholder = this.getAttribute("placeholder") ?? "";

    this.shadowRoot.adoptedStyleSheets = [textareaStyles];
    this.shadowRoot.innerHTML = `<div class="container">
      <span class="title">${title}</span>
      <textarea
        class="textarea"
        rows="2"
        placeholder="${placeholder}"
      ></textarea>
      <span class="error"></span>
    </div>`;

    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.adjustHeight = this.adjustHeight.bind(this);
    this.validators = this.getValidators();
  }

  validateAndShowError(): boolean {
    const { isValid } = this.validate();
    this.handleBlur();

    return isValid;
  }

  handleInput() {
    this.error.textContent = "";
    this.container?.classList.remove("invalid");
    this.adjustHeight(2, 3);
  }

  handleBlur() {
    const { error, isValid } = this.validate();

    if (!isValid) {
      this.error.textContent = error;
      this.container?.classList.add("invalid");
      return;
    }

    this.container?.classList.remove("invalid");
    this.container?.classList.add("valid");
  }

  connectedCallback() {
    this.container = this.shadowRoot?.querySelector(".container");
    this.textarea = this.shadowRoot?.querySelector(".textarea");
    this.error = this.shadowRoot?.querySelector(".error");

    this.textarea.addEventListener("input", this.handleInput);
    this.textarea.addEventListener("blur", this.handleBlur);

    setTimeout(() => this.adjustHeight(2, 3), 0);
  }

  disconnectedCallback() {
    this.textarea.removeEventListener("input", this.handleInput);
    this.textarea.removeEventListener("blur", this.handleBlur);
  }

  private adjustHeight(minRows = 2, maxRows = 3) {
    if (!this.textarea) return;

    const value = this.textarea.value;
    const start = this.textarea.selectionStart;
    const end = this.textarea.selectionEnd;

    this.textarea.style.height = "auto";
    this.textarea.style.overflow = "hidden";

    const lineHeight =
      parseInt(getComputedStyle(this.textarea).lineHeight) || 27;

    const scrollHeight = this.textarea.scrollHeight;

    let neededRows = Math.ceil(scrollHeight / lineHeight);

    if (!value) {
      neededRows = minRows;
    }

    const newRows = Math.min(maxRows, Math.max(minRows, neededRows));

    this.textarea.rows = newRows;

    if (neededRows > maxRows) {
      this.textarea.style.overflowY = "auto";
    } else {
      this.textarea.style.overflowY = "hidden";
    }

    this.textarea.setSelectionRange(start, end);
  }

  validate() {
    const value = this.textarea?.value;
    let error = "";

    if (value && this.customValidation) {
      error = this.customValidation(value);
    }

    if (this.validators.required && !value) {
      error = "Поле обязательно";
    }

    return {
      isValid: error === "",
      error,
    };
  }

  getValidators() {
    return {
      required: this.hasAttribute("required"),
    };
  }

  get value() {
    return this.textarea?.value;
  }
}

customElements.define("ui-textarea", UITextarea);

export default UITextarea;
