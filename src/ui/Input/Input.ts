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

  .error {
    margin-top: 4px;
    font-size: 12px;
    color: #FF3B30;
  }
`);

class UIInput extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [inputStyles];
    shadow.innerHTML = `<div class="container">
      <span class="title">${this.getAttribute("inputTitle") ?? ""}</span>
      <input class="input" placeholder="${this.getAttribute("placeholder") ?? ""}" />
      <span class="error">Поле обязательно</span>
    </div>`;
  }
}

customElements.define("ui-input", UIInput);

export default UIInput;
