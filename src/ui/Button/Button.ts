const buttonStyles = new CSSStyleSheet();

buttonStyles.replaceSync(`
  :host([loading]) {
    pointer-events: none;
  }

  .button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 295px;
    height: 64px;
    color: #FFF;
    background-color: #FF335F;
    font-size: 18px;
    font-weight: 500;
    border: none;
    border-radius: 56px;
    transition: 0.6s;
    cursor: pointer;
  }

  .button:hover {
    background-color: #FF446D;
    box-shadow: 0px 0px 16px 0px #FF335F;
  }

  .button:active {
    background-color: #E1264F;
    box-shadow: none;
  }

  .button.loading {
    background-color: #FF335F;
    pointer-events: none;
    cursor: default;
  }

  .button.loading:hover {
    background-color: #FF335F;
    box-shadow: none;
  }

  .button.loading:active {
    background-color: #FF335F;
    box-shadow: none;
  }

  .button:disabled {
    background-color: #A6A6A6;
    box-shadow: none;
    cursor: default;
  }

  .spinner {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      rgba(255, 255, 255, 0.02) 0deg,
      rgba(255, 255, 255, 0.03) 30deg,
      rgba(255, 255, 255, 0.04) 60deg,
      rgba(255, 255, 255, 0.06) 90deg,
      rgba(255, 255, 255, 0.08) 120deg,
      rgba(255, 255, 255, 0.1) 150deg,
      rgba(255, 255, 255, 0.15) 180deg,
      rgba(255, 255, 255, 0.2) 210deg,
      rgba(255, 255, 255, 0.3) 240deg,
      rgba(255, 255, 255, 0.4) 260deg,
      rgba(255, 255, 255, 0.5) 280deg,
      rgba(255, 255, 255, 0.6) 300deg,
      rgba(255, 255, 255, 0.7) 315deg,
      rgba(255, 255, 255, 0.8) 330deg,
      rgba(255, 255, 255, 0.9) 345deg,
      rgb(255, 255, 255) 360deg
    );
    mask: radial-gradient(circle at 50% 50%, transparent 55%, black 56%);
    -webkit-mask: radial-gradient(circle at 50% 50%, transparent 55%, black 56%);
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`);

class UIButton extends HTMLElement {
  button: HTMLButtonElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return ["loading", "disabled"];
  }

  attributeChangedCallback(
    _: string,
    oldValue: string | null,
    newValue: string | null,
  ): void {
    if (oldValue === newValue) return;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const loading = this.hasAttribute("loading");
    const disabled = this.hasAttribute("disabled");

    if (!this.shadowRoot) return;

    this.shadowRoot.adoptedStyleSheets = [buttonStyles];
    this.shadowRoot.innerHTML = `
      <button class="button ${loading ? "loading" : ""}" ${disabled ? "disabled" : ""}>
        ${loading ? '<span class="spinner"></span>' : "<slot></slot>"}
      </button>
    `;

    this.button = this.shadowRoot.querySelector(".button");
  }

  get loading() {
    return this.hasAttribute("loading");
  }

  set loading(value: boolean) {
    if (value) {
      this.setAttribute("loading", "");
    } else {
      this.removeAttribute("loading");
    }
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }
}

customElements.define("ui-button", UIButton);

export default UIButton;
