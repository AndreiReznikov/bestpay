import successImage from "@assets/statuses/success.png";
import errorImage from "@assets/statuses/error.png";
import notPayedImage from "@assets/statuses/not-payed.png";

const notifyStatusStyles = new CSSStyleSheet();

notifyStatusStyles.replaceSync(`
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .text {
    font-weight: 600;
    font-size: 24px;
    color: var(--color-text-secondary, #595959);
  }
`);

const status = "success";
const image =
  status === "success"
    ? successImage
    : status === "error"
      ? errorImage
      : status === "not-payed"
        ? notPayedImage
        : "";

class CNotifyStatus extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (!this.shadowRoot) return;

    const text = this.getAttribute("text") || "";

    this.shadowRoot.adoptedStyleSheets = [notifyStatusStyles];
    this.shadowRoot.innerHTML = `
      <div class="container">
        <img class="image" width="88" height="auto" src="${image}" alt="${text}">
        <h2 class="text">${text}</h2>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("c-notify-status", CNotifyStatus);

export default CNotifyStatus;
