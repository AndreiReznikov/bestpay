import type { UIButton } from "../../ui/Button";
import type { UIInput } from "../../ui/Input";

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
    box-shadow: 0px 4px 16px 0px #40404029;
  }
`);

class UIUnipayForm extends HTMLElement {
  button: UIButton | null = null;
  emailInput: UIInput | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (!this.shadowRoot) return;

    this.shadowRoot.adoptedStyleSheets = [unipayFormStyles];
    this.shadowRoot.innerHTML = `<form class="form">
      <h2>Создание заказа</h2>
      <ui-input
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
        title="Описание"
        placeholder="Что-то о заказе"
        required
      ></ui-textarea>
      <ui-button class="button">Создать</ui-button>
    </form>`;
  }

  connectedCallback() {
    this.button = this.shadowRoot?.querySelector(".button") || null;
    this.emailInput = this.shadowRoot?.querySelector(".email") || null;

    this.button.addEventListener("click", () => {
      console.log(this.emailInput?.validateAndShowError());
      this.button.loading = !this.button.loading;
    });
  }
}

customElements.define("ui-unipay-form", UIUnipayForm);

export default UIUnipayForm;
