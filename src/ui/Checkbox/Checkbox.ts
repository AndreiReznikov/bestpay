const checkboxStyles = new CSSStyleSheet();

checkboxStyles.replaceSync(`
  :host {
    display: inline-block;
  }

  .checkbox-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    gap: 8px;
    position: relative;
  }

  .checkbox-container input {
    position: absolute;
    opacity: 0;
    width: 18px;
    height: 18px;
    margin: 0;
    cursor: pointer;
    z-index: 1;
  }

  .checkmark {
    position: relative;
    display: inline-block;
    width: 18px;
    height: 18px;
    background: white;
    border: 2px solid #A6A6A6;
    border-radius: 6px;
    flex-shrink: 0;
    pointer-events: none;
  }

  .checkmark::after {
    content: '';
    position: absolute;
    display: none;
    left: 6px;
    top: 2px;
    width: 5px;
    height: 9px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .checkbox-container input:checked + .checkmark {
    background: #FF335F;
    border-color: #FF335F;
  }

  .checkbox-container input:checked + .checkmark::after {
    display: block;
  }

  .label {
    font-size: 14px;
    color: #595959;
    cursor: pointer;
  }
`);

class UICheckbox extends HTMLElement {
  checkbox: HTMLInputElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (!this.shadowRoot) return;

    this.shadowRoot.adoptedStyleSheets = [checkboxStyles];

    const label = this.getAttribute("label") || "";
    const checked = this.hasAttribute("checked") ? "checked" : "";
    const disabled = this.hasAttribute("disabled") ? "disabled" : "";
    const name = this.getAttribute("name") || "";

    this.shadowRoot.innerHTML = `
      <label class="checkbox-container">
        <input
          type="checkbox"
          ${checked}
          ${disabled}
          name="${name}"
          class="checkbox"
        >
        <span class="checkmark"></span>
        ${label ? `<span class="label">${label}</span>` : ""}
        <slot></slot>
      </label>
    `;
  }

  connectedCallback() {
    this.checkbox = this.shadowRoot?.querySelector(".checkbox");
  }

  get checked() {
    return this.checkbox?.checked || false;
  }

  set checked(value) {
    if (this.checkbox) {
      this.checkbox.checked = value;
    }
  }
}

customElements.define("ui-checkbox", UICheckbox);

export default UICheckbox;