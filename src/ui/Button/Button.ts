const buttonStyles = new CSSStyleSheet();

buttonStyles.replaceSync(`
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

  .button:disabled {
    background-color: #A6A6A6;
    box-shadow: none;
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
    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [buttonStyles];
    shadow.innerHTML = `<button class="button">
      ${this.hasAttribute("loading") ? '<span class="spinner"></span>' : "<slot></slot>"}
    </button>`;
  }
}

customElements.define("ui-button", UIButton);

export default UIButton;
