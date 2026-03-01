import {
  checkIsDateValid,
  maskCardInput,
  maskCvvInput,
  maskDateInput,
  maskMoneyInput,
} from "./utils";

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
    color: #FF3B30;
  }

  .container.invalid .input {
    border-bottom: 1px solid #FF3B30;
  }

  .title-wrapper {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 14px;
  }

  .title {
    font-size: 12px;
    color: #A6A6A6;
  }

  .input-wrapper {
    position: relative;
  }

  .aside {
    position: absolute;
    top: 0;
    right: 0;
    color: #A6A6A6;
  }

  .input {
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    color: #595959;
    border: none;
    border-bottom: 1px solid #F2F2F2;
    outline: none;
    letter-spacing: 1px;
    caret-color: #FF335F;
  }

  .input::placeholder {
    color: #F2F2F2;
  }

  .input:hover {
    border-bottom: 1px solid #FF335F;
  }

  .error {
    min-height: 1rem;
    margin-top: 4px;
    font-size: 12px;
    color: #FF3B30;
  }
`);

class UIInput extends HTMLElement {
  container: HTMLDivElement | null = null;
  input: HTMLInputElement | null = null;
  error: HTMLSpanElement | null = null;
  validators: Record<string, string | boolean | null> = {};

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

  handleInput(e: Event) {
    const target = e.target as HTMLInputElement;

    if (this.hasAttribute("money")) {
      maskMoneyInput(target);
    }

    if (this.hasAttribute("card")) {
      maskCardInput(target);
    }

    if (this.hasAttribute("date")) {
      maskDateInput(target);
    }

    if (this.hasAttribute("cvv")) {
      maskCvvInput(target);
    }

    this.error.textContent = "";
    this.container?.classList.remove("invalid");
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
    this.input = this.shadowRoot?.querySelector(".input");
    this.error = this.shadowRoot?.querySelector(".error");
    this.input.addEventListener("input", this.handleInput);
    this.input.addEventListener("blur", this.handleBlur);
  }

  validateAndShowError(): boolean {
    const { isValid } = this.validate();
    this.handleBlur();

    return isValid;
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
      error = "Поле обязательно";
    }

    if (
      this.validators.card &&
      value &&
      !this.cardCheck(value.replace(/\s/g, ""))
    ) {
      error = "Неверный номер карты";
    }

    if (
      this.validators.email &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      error = "Неверный Email";
    }

    if (this.validators.date && value) {
      if (!/^\d{2}\/\d{2}$/.test(value)) {
        error = "Неверный формат MM/YY";
      } else {
        const [month, year] = value.split("/").map(Number);

        if (month < 1 || month > 12) {
          error = "Неверно введён месяц";
        }

        if (!error && !checkIsDateValid(month, year)) {
          error = "Срок действия карты истёк";
        }
      }
    }

    if (this.validators.cvv && value && value.length < 3) {
      error = "Минимум три цифры";
    }

    return {
      isValid: error === "",
      error,
    };
  }

  cardCheck(cardNumber: string) {
    if (!/^\d+$/.test(cardNumber)) return false;

    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  }

  getValidators() {
    return {
      required: this.hasAttribute("required"),
      minLength: this.getAttribute("minlength"),
      maxLength: this.getAttribute("maxlength"),
      money: this.hasAttribute("money"),
      email: this.hasAttribute("email"),
      card: this.hasAttribute("card"),
      date: this.hasAttribute("date"),
      cvv: this.hasAttribute("cvv"),
    };
  }
}

customElements.define("ui-input", UIInput);

export default UIInput;
