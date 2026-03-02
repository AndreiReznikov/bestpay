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
    background-color: var(--color-primary, #ff335f);
    font-size: 18px;
    font-weight: 500;
    border: none;
    border-radius: 56px;
    transition: 0.6s;
    cursor: pointer;
  }

  @media (hover: hover) {
    .button:hover {
      background-color: var(--color-primary-hover, #ff446d);
      box-shadow: 0px 0px 16px 0px var(--color-primary, #ff335f);
    }
  }

  .button:active {
    background-color: var(--color-primary-active, #e1264f);
    box-shadow: none;
  }

  .button.loading {
    background-color: var(--color-primary, #ff335f);
    pointer-events: none;
    cursor: default;
  }

  @media (hover: hover) {
    .button.loading:hover {
      background-color: var(--color-primary, #ff335f);
      box-shadow: none;
    }
  }

  .button.loading:active {
    background-color: var(--color-primary, #ff335f);
    box-shadow: none;
  }

  .button:disabled {
    background-color: var(--color-text-primary, #a6a6a6);
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
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  public static get observedAttributes(): string[] {
    return ["loading", "disabled"];
  }

  public attributeChangedCallback(
    _: string,
    oldValue: string | null,
    newValue: string | null,
  ): void {
    if (oldValue === newValue) return;
    this.render();
  }

  public connectedCallback(): void {
    this.render();
  }

  private render(): void {
    const loading = this.hasAttribute("loading");
    const disabled = this.hasAttribute("disabled");

    if (!this.shadowRoot) return;

    this.shadowRoot.adoptedStyleSheets = [buttonStyles];
    this.shadowRoot.innerHTML = `
      <button class="button ${loading ? "loading" : ""}" ${disabled ? "disabled" : ""}>
        ${loading ? '<span class="spinner"></span>' : "<slot></slot>"}
      </button>
    `;
  }

  public get loading(): boolean {
    return this.hasAttribute("loading");
  }

  public set loading(value: boolean) {
    if (value) {
      this.setAttribute("loading", "");
    } else {
      this.removeAttribute("loading");
    }
  }

  public get disabled(): boolean {
    return this.hasAttribute("disabled");
  }

  public set disabled(value: boolean) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }
}

customElements.define("ui-button", UIButton);

export default UIButton;
