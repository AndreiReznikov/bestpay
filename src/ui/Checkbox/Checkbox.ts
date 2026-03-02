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
    border: 2px solid var(--color-text-primary, #a6a6a6);
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
    background: var(--color-primary, #ff335f);
    border-color: var(--color-primary, #ff335f);
  }

  .checkbox-container input:focus + .checkmark {
    outline: 2px solid black;
  }

  .checkbox-container input:checked + .checkmark::after {
    display: block;
  }

  .label {
    font-size: 14px;
    color: var(--color-text-secondary, #595959);
    cursor: pointer;
  }
`);

class UICheckbox extends HTMLElement {
  private checkbox: HTMLInputElement | null = null;

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
          class="checkbox"
          type="checkbox"
          ${checked}
          ${disabled}
          name="${name}"
        />
        <span class="checkmark"></span>
        ${label ? `<span class="label">${label}</span>` : ""}
        <slot></slot>
      </label>
    `;
  }

  public connectedCallback(): void {
    this.checkbox = this.shadowRoot?.querySelector(".checkbox") ?? null;
  }

  public get checked(): boolean {
    return this.checkbox?.checked || false;
  }

  public set checked(value: boolean) {
    if (this.checkbox) {
      this.checkbox.checked = value;
    }
  }
}

customElements.define("ui-checkbox", UICheckbox);

export default UICheckbox;