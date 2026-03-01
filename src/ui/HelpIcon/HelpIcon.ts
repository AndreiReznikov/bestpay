const helpIconStyles = new CSSStyleSheet();

helpIconStyles.replaceSync(`
  :host {
    position: relative;
    display: flex;
    width: 18px;
    height: 18px;
    user-select: none;
  }

  .help-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border: none;
    border-radius: 50%;
    background: #F2F2F2;
    color: #A6A6A6;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
  }

  .help-icon:hover {
    background: #A6A6A6;
    color: white;
  }

  .tooltip {
    position: absolute;
    left: 50%;
    bottom: 100%;
    display: flex;
    min-width: 152px;
    width: 100%;
    margin-bottom: 5px;
    padding: 8px;
    font-size: 12px;
    background: #595959;
    color: white;
    border-radius: 8px;
    transform: translateX(-50%);
    // white-space: nowrap;
    visibility: hidden;
    z-index: 1000;
  }

  .help-icon:hover + .tooltip {
    visibility: visible;
  }

  .tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    width: 0;
    height: 0;
    margin-top: -1px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 8px solid #595959;
    border-bottom: 0;
    transform: translateX(-50%);
  }
`);

class UIHelpIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (!this.shadowRoot) return;

    const text = this.getAttribute("text") || "";

    this.shadowRoot.adoptedStyleSheets = [helpIconStyles];
    this.shadowRoot.innerHTML = `
      <button
        class="help-icon"
        aria-label="Показать подсказку"
      >?</button>
      <div class="tooltip">${text}</div>
    `;
  }
}

customElements.define("ui-help-icon", UIHelpIcon);

export default UIHelpIcon;
