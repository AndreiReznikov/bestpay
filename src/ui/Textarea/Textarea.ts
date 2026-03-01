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

  handleInput(e: Event) {
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

  adjustHeight(minRows = 2, maxRows = 3) {
    if (!this.textarea) return;

    const value = this.textarea.value;
    const currentRows = this.textarea.rows;

    const lineBreaks = (value.match(/\n/g) || []).length;

    let neededRows = minRows;

    if (value) {
      neededRows = 1;

      neededRows += lineBreaks;

      if (lineBreaks > 0) {
        const lastLine = value.split("\n").pop() || "";

        const span = document.createElement("span");
        span.style.font = getComputedStyle(this.textarea).font;
        span.style.visibility = "hidden";
        span.style.position = "absolute";
        span.style.whiteSpace = "nowrap";
        span.textContent = lastLine;
        document.body.appendChild(span);

        const textWidth = span.offsetWidth;
        const textareaWidth = this.textarea.clientWidth - 20;

        document.body.removeChild(span);

        if (textWidth > textareaWidth) {
          neededRows++;
        }
      }
    }

    let newRows = currentRows;

    if (neededRows > currentRows) {
      newRows = Math.min(maxRows, neededRows);
    } else if (neededRows < currentRows && currentRows > minRows) {
      newRows = Math.max(minRows, neededRows);
    }

    this.textarea.rows = newRows;
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
