import type { UIButton } from "../../ui/Button";
import type { UICheckbox } from "../../ui/Checkbox";
import type { UIInput } from "../../ui/Input";

const paymentFormStyles = new CSSStyleSheet();

paymentFormStyles.replaceSync(`
  :host {
    display: inline-flex;
    max-width: 412px;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  .card-wrapper {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 48px 56px;
    border-radius: 12px;
    box-shadow: 0px 4px 16px 0px #40404029;
  }

  .card-data-wrapper {
    display: flex;
    gap: 32px;
  }
`);

class UIPaymentForm extends HTMLElement {
  button: UIButton | null = null;
  checkbox: UICheckbox | null = null;
  cardInput: UIInput | null = null;
  dateInput: UIInput | null = null;
  cvvInput: UIInput | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (!this.shadowRoot) return;

    this.shadowRoot.adoptedStyleSheets = [paymentFormStyles];
    this.shadowRoot.innerHTML = `<form class="form">
      <div class="card-wrapper">
        <ui-input
          class="card"
          title="Номер карты"
          placeholder="1234 5678 1234 5678"
          card
          required
        >
        </ui-input>
        <div class="card-data-wrapper">
          <ui-input
            class="date"
            title="Месяц / год"
            placeholder="ММ / ГГ"
            size="sm"
            date
            required
          >
          </ui-input>
          <ui-input
            class="cvv"
            title="CVV / CVC"
            placeholder="123"
            size="sm"
            cvv
            required
          >
          </ui-input>
        </div>
      </div>
      <ui-checkbox
        class="checkbox"
        label="Сохранить карту для следующих покупок"
        checked
      >
      </ui-checkbox>
      <ui-button class="button">Оплатить</ui-button>
    </form>`;
  }

  connectedCallback() {
    this.button = this.shadowRoot?.querySelector(".button") || null;
    this.checkbox = this.shadowRoot?.querySelector(".checkbox") || null;
    this.cardInput = this.shadowRoot?.querySelector(".card") || null;
    this.dateInput = this.shadowRoot?.querySelector(".date") || null;
    this.cvvInput = this.shadowRoot?.querySelector(".cvv") || null;

    this.button.addEventListener("click", () => {
      const isValid = this.validate();

      if (isValid) {
        console.log(this.checkbox?.checked)
        this.button.loading = true;

        setTimeout(() => {
          window.location.href = "/result.html";
        }, 500);
      }
    });
  }

  validate() {
    const allElements =
      this.shadowRoot?.querySelectorAll("ui-input, ui-textarea") || [];

    let isValid = true;

    allElements.forEach((element) => {
      if (typeof (element as any).validateAndShowError === "function") {
        const result = (element as any).validateAndShowError();
        isValid = isValid && result;
      }
    });

    return isValid;
  }
}

customElements.define("ui-payment-form", UIPaymentForm);

export default UIPaymentForm;
