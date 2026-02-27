class UIButton extends HTMLElement {
  constructor() {
    super();
    console.log("button");
  }
}

customElements.define('ui-button', UIButton);

export default UIButton;