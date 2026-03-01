const footerStyles = new CSSStyleSheet();

footerStyles.replaceSync(`

`);

class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (!this.shadowRoot) return;

    this.shadowRoot.adoptedStyleSheets = [footerStyles];
    this.shadowRoot.innerHTML = `
      <footer class="footer">
      </footer>
    `;
  }
}

customElements.define("ui-footer", Footer);

export default Footer;