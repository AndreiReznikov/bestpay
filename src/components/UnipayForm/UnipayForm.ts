import type { UIButton } from "../../ui/Button";
import type { UIInput } from "../../ui/Input";
import type { UITextarea } from "../../ui/Textarea";

const unipayFormStyles = new CSSStyleSheet();

unipayFormStyles.replaceSync(`
  :host {
    display: inline-flex;
    max-width: 412px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 48px 56px;
    border-radius: 12px;
    box-shadow: 0px 4px 16px 0px var(--color-shadow, #40404029);
  }

  .title {
    color: var(--color-text-secondary, #595959);
  }
`);

class CUnipayForm extends HTMLElement {
  button: UIButton | null = null;
  moneyInput: UIInput | null = null;
  emailInput: UIInput | null = null;
  textarea: UITextarea | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (!this.shadowRoot) return;

    this.shadowRoot.adoptedStyleSheets = [unipayFormStyles];
    this.shadowRoot.innerHTML = `<form class="form">
      <h2 class="title">Создание заказа</h2>
      <ui-input
        class="money"
        title="Введите сумму заказа"
        placeholder="0"
        aside="₽"
        money
        required
      ></ui-input>
      <ui-input
        class="email"
        title="Email"
        placeholder="example@mail.com"
        email
        required
      ></ui-input>
      <ui-textarea
        class="textarea"
        title="Описание"
        placeholder="Что-то о заказе"
        required
      ></ui-textarea>
      <ui-button class="button">Создать</ui-button>
    </form>`;
  }

  connectedCallback() {
    this.button = this.shadowRoot?.querySelector(".button") || null;
    this.moneyInput = this.shadowRoot?.querySelector(".money") || null;
    this.emailInput = this.shadowRoot?.querySelector(".email") || null;
    this.textarea = this.shadowRoot?.querySelector(".textarea") || null;

    this.button.addEventListener("click", () => {
      const isValid = this.validate();

      if (isValid) {
        this.button.loading = true;

        setTimeout(() => {
          window.location.href = "/payment.html";
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

customElements.define("c-unipay-form", CUnipayForm);

export default CUnipayForm;
