const inputStyles = new CSSStyleSheet();

inputStyles.replaceSync(`
  .container {
    display: flex;
    flex-direction: column;
  }

  .title {
    margin-bottom: 14px;
    font-size: 12px;
    color: #A6A6A6;
  }

  .input {
    width: 319px;
    height: 26px;
    font-size: 18px;
    font-weight: 500;
    color: #595959;
    border: none;
    border-bottom: 1px solid #F2F2F2;
    outline: none;
    letter-spacing: 1px;
  }

  .input::placeholder {
    color: #F2F2F2;
  }

  .input:hover {
    border-bottom: 1px solid #FF335F;
  }

  .error {
    margin-top: 4px;
    font-size: 12px;
    color: #FF3B30;
  }
`);

class UIInput extends HTMLElement {
  input: HTMLInputElement | null = null;
  error: HTMLSpanElement | null = null;
  validators: Record<string, string | boolean | null> = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (!this.shadowRoot) return;

    this.shadowRoot.adoptedStyleSheets = [inputStyles];
    this.shadowRoot.innerHTML = `<div class="container">
      <span class="title">${this.getAttribute("inputTitle") ?? ""}</span>
      <input class="input" placeholder="${this.getAttribute("placeholder") ?? ""}" />
      <span class="error"></span>
    </div>`;

    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validators = this.getValidators();
  }

  handleInput(e: Event) {
    this.error.textContent = "";
  }

  handleBlur() {
    // console.log(this.validate());
    this.error.textContent = this.validate().error;
  }

  connectedCallback() {
    this.input = this.shadowRoot?.querySelector(".input");
    this.error = this.shadowRoot?.querySelector(".error");
    this.input.addEventListener("input", this.handleInput);
    this.input.addEventListener("blur", this.handleBlur);
  }

  validate() {
    const value = this.input?.value;
    let error = "";

    if (
      this.validators.minLength &&
      value &&
      value.length < Number(this.validators.minLength)
    ) {
      error = `Должно быть не менее ${this.validators.minLength} символов`;
    }

    if (
      this.validators.maxLength &&
      value &&
      value.length > Number(this.validators.maxLength)
    ) {
      error = `Должно быть не более ${this.validators.maxLength} символов`;
    }

    if (this.validators.required && !value) {
      error = "Обязательное поле";
    }

    return {
      isValid: error === "",
      error,
    };
  }

  getValidators() {
    return {
      required: this.hasAttribute("required"),
      minLength: this.getAttribute("minlength"),
      maxLength: this.getAttribute("maxlength"),
    };
  }
}

customElements.define("ui-input", UIInput);

export default UIInput;
