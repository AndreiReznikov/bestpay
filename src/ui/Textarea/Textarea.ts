const textareaStyles = new CSSStyleSheet();

textareaStyles.replaceSync(`
  .container {
    display: flex;
    flex-direction: column;
    max-width: 319px;
    width: 100%;
  }

  .container.invalid * {
    color: #FF3B30;
  }

  .container.invalid .textarea {
    border-bottom: 1px solid #FF3B30;
  }

  .title {
    margin-bottom: 14px;
    font-size: 12px;
    color: #A6A6A6;
  }

  .textarea {
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    color: #595959;
    border: none;
    border-bottom: 1px solid #F2F2F2;
    outline: none;
    letter-spacing: 0;
    caret-color: #FF335F;
    resize: none;
  }

  .textarea::placeholder {
    color: #F2F2F2;
  }

  .textarea:hover {
    border-bottom: 1px solid #FF335F;
  }

  .error {
    margin-top: 4px;
    font-size: 12px;
    color: #FF3B30;
  }
`);

class UITextarea extends HTMLElement {
  container: HTMLDivElement | null = null;
  textarea: HTMLTextAreaElement | null = null;
  error: HTMLSpanElement | null = null;
  validators: Record<string, string | boolean | null> = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (!this.shadowRoot) return;

    this.shadowRoot.adoptedStyleSheets = [textareaStyles];
    this.shadowRoot.innerHTML = `<div class="container">
      <span class="title">${this.getAttribute("textareaTitle") ?? ""}</span>
      <textarea
        class="textarea"
        rows="${this.getAttribute("rows") ?? "3"}"
        placeholder="${this.getAttribute("placeholder") ?? ""}"
      ></textarea>
      <span class="error"></span>
    </div>`;

    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validators = this.getValidators();
  }

  handleInput(e: Event) {
    this.error.textContent = "";
    this.container?.classList.remove("invalid");
  }

  handleBlur() {
    // console.log(this.validate());

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
  }

  validate() {
    const value = this.textarea?.value;
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
      minLength: this.getAttribute("minlength"),
      maxLength: this.getAttribute("maxlength"),
    };
  }
}

customElements.define("ui-textarea", UITextarea);

export default UITextarea;
