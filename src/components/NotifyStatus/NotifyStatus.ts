import { getStatusConfig } from "./utils";

const notifyStatusStyles = new CSSStyleSheet();

notifyStatusStyles.replaceSync(`
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 48px;
  }

  .image {
    width: 88px;
    height: auto;
    margin-bottom: 24px;
  }

  .text {
    max-width: 312px;
    font-weight: 600;
    font-size: 24px;
    color: var(--color-text-secondary, #595959);
    text-align: center;
    margin: 0 0 16px 0;
  }
`);

const urlParams = new URLSearchParams(window.location.search);
const status = urlParams.get("status") || "error";

const { image, text } = getStatusConfig(status);

class CNotifyStatus extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (!this.shadowRoot) return;

    this.shadowRoot.adoptedStyleSheets = [notifyStatusStyles];
    this.shadowRoot.innerHTML = `
      <div class="container">
        <img class="image" src="${image}" alt="${text}">
        <h2 class="text">${text}</h2>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("c-notify-status", CNotifyStatus);

export default CNotifyStatus;
