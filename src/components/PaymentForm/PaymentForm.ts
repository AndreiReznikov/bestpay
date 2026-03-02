import type { UIButton } from "@ui/Button";
import bankLogoSrc from "@assets/logos/bank-logo.svg";
import type { UIInput } from "@/ui/Input";
import {
  maskCardInput,
  maskCvvInput,
  maskDateInput,
  validateCard,
  validateCvv,
  validateDate,
} from "./utils";

const paymentFormStyles = new CSSStyleSheet();

paymentFormStyles.replaceSync(`
  :host {
    display: inline-flex;
    max-width: 412px;
    width: 100%;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 100%;
  }

  .card-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    padding: 60px 56px 18px 56px;
    border-radius: 12px;
    box-shadow: 0px 4px 16px 0px var(--color-shadow, #40404029);
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    .card-wrapper {
      width: auto;
      padding: 0;
      box-shadow: none;
    }
  }


  .logo-container {
    position: absolute;
    top: 24px;
    right: 24px;
    display: flex;
    justify-content: flex-end;
  }

    @media (max-width: 768px) {
      .logo-container {
        top: -60px;
        right: 0;
      }
    }

  .logo {
    width: 55px;
    height: 47px;
    background-image: url("${bankLogoSrc}");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }


  .card-data-wrapper {
    display: flex;
    gap: 32px;
  }

  @media (max-width: 768px) {
    .card-data-wrapper {
      gap: 5px;
    }
  }

  .checkbox {
    margin-top: 8px;
  }

  .button {
    padding-top: 50px;
  }

  .terms {
    max-width: 240px;
    margin: 0;
    font-size: 11px;
    text-align: center;
    color: var(--color-text-primary, #a6a6a6);
  }

  .terms-link {
    color: var(--color-text-secondary, #595959);
  }
`);

const SUM: string = "12 500₽";

class CPaymentForm extends HTMLElement {
  private button: UIButton | null = null;
  private cardInput: UIInput | null = null;
  private dateInput: UIInput | null = null;
  private cvvInput: UIInput | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (!this.shadowRoot) return;

    this.shadowRoot.adoptedStyleSheets = [paymentFormStyles];
    this.shadowRoot.innerHTML = `<form class="form">
      <section class="card-wrapper">
        <div class="logo-container">
          <div class="logo"></div>
        </div>
        <ui-input
          class="card"
          title="Номер карты"
          placeholder="1234 5678 1234 5678"
          required
        ></ui-input>
        <section class="card-data-wrapper">
          <ui-input
            class="date"
            title="Месяц / год"
            placeholder="ММ / ГГ"
            size="sm"
            required
          ></ui-input>
          <ui-input
            class="cvv"
            title="CVV / CVC"
            placeholder="123"
            size="sm"
            required
          >
            <ui-help-icon
              slot="title-aside"
              text="Три цифры с обратной стороны карты"
            ></ui-help-icon>
          </ui-input>
        </section>
      </section>
      <ui-checkbox
        class="checkbox"
        label="Сохранить карту для следующих покупок"
        checked
      ></ui-checkbox>
      <ui-button class="button" disabled>Оплатить ${SUM}</ui-button>
      <p class="terms">
        Нажимая на кнопку «‎Перевести»‎, вы соглашаетесь
        с&nbsp;<a
          class="terms-link"
          href="/mock-terms/change-me"
          target="_blank"
          >условиями оферты</a>
      </p>
    </form>`;
  }

  public connectedCallback(): void {
    this.button = this.shadowRoot?.querySelector(".button") || null;
    this.cardInput = this.shadowRoot?.querySelector(".card") || null;
    this.dateInput = this.shadowRoot?.querySelector(".date") || null;
    this.cvvInput = this.shadowRoot?.querySelector(".cvv") || null;

    this.updateButtonState = this.updateButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.shadowRoot?.addEventListener("input", this.updateButtonState);
    this.button?.addEventListener("click", this.handleSubmit);

    this.bindMasks();
    this.bindValidation();

    this.updateButtonState();
  }

  public disconnectedCallback(): void {
    this.shadowRoot?.removeEventListener("input", this.updateButtonState);
    this.button?.removeEventListener("click", this.handleSubmit);
  }

  private bindValidation(): void {
    setTimeout(() => {
      if (this.cardInput) {
        this.cardInput.customValidation = validateCard;
      }
      if (this.dateInput) {
        this.dateInput.customValidation = validateDate;
      }
      if (this.cvvInput) {
        this.cvvInput.customValidation = validateCvv;
      }
    });
  }

  private bindMasks(): void {
    setTimeout(() => {
      if (this.cardInput) {
        this.cardInput.customMask = maskCardInput;
      }
      if (this.dateInput) {
        this.dateInput.customMask = maskDateInput;
      }
      if (this.cvvInput) {
        this.cvvInput.customMask = maskCvvInput;
      }
    });
  }

  private updateButtonState(): void {
    if (!this.button) return;

    const inputs = this.shadowRoot?.querySelectorAll("ui-input") || [];

    const allValid = Array.from(inputs).every(
      (input) => (input as any).validate().isValid,
    );

    this.button.disabled = !allValid;
  }

  private handleSubmit(e: Event): void {
    e.preventDefault();

    const inputs = this.shadowRoot?.querySelectorAll("ui-input") || [];
    const isValid = Array.from(inputs).every((input) =>
      (input as any).validateAndShowError(),
    );

    if (isValid) {
      this.button!.loading = true;
      const random = Math.random();

      let status: string;
      if (random < 0.33) {
        status = "success";
      } else if (random < 0.66) {
        status = "error";
      } else {
        status = "not-payed";
      }

      setTimeout(() => {
        window.location.href = `${import.meta.env.BASE_URL}notify.html?status=${status}`;
      }, 500);
    }
  }
}

customElements.define("c-payment-form", CPaymentForm);

export default CPaymentForm;
