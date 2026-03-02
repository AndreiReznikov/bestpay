const i=new CSSStyleSheet;i.replaceSync(`
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
`);class s extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.render()}static get observedAttributes(){return["loading","disabled"]}attributeChangedCallback(t,e,r){e!==r&&this.render()}connectedCallback(){this.render()}render(){const t=this.hasAttribute("loading"),e=this.hasAttribute("disabled");this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[i],this.shadowRoot.innerHTML=`
      <button class="button ${t?"loading":""}" ${e?"disabled":""}>
        ${t?'<span class="spinner"></span>':"<slot></slot>"}
      </button>
    `)}get loading(){return this.hasAttribute("loading")}set loading(t){t?this.setAttribute("loading",""):this.removeAttribute("loading")}get disabled(){return this.hasAttribute("disabled")}set disabled(t){t?this.setAttribute("disabled",""):this.removeAttribute("disabled")}}customElements.define("ui-button",s);const o=new CSSStyleSheet;o.replaceSync(`
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .container.sm {
    max-width: 124px;
  }

  .container.md {
    max-width: 319px;
  }

  .container.sm input {
    height: 26px;
  }

  .container.invalid * {
    color: var(--color-error, #ff3b30);
  }

  .title-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 18px;
    margin-bottom: 14px;
  }

  .title {
    font-size: 12px;
    color: var(--color-text-primary, #a6a6a6);
  }

  .input-wrapper {
    position: relative;
  }

  .aside {
    position: absolute;
    top: 0;
    right: 0;
    color: var(--color-text-primary, #a6a6a6);
  }

  .input {
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    color: var(--color-text-secondary, #595959);
    border: none;
    border-bottom: 1px solid var(--color-text-placeholder, #f2f2f2);
    outline: none;
    letter-spacing: 1px;
    caret-color: var(--color-primary, #ff335f);
  }

  .input::placeholder {
    color: var(--color-text-placeholder, #f2f2f2);
  }

  .container.invalid .input {
    border-bottom: 1px solid var(--color-error, #ff3b30);
  }

  .input:focus {
    border-bottom: 1px solid var(--color-border-hover, #ff335f);
  }

  @media (hover: hover) {
    .input:hover {
      border-bottom: 1px solid var(--color-border-hover, #ff335f);
    }
  }

  .error {
    min-height: 1rem;
    margin-top: 4px;
    font-size: 12px;
    color: var(--color-error, #ff3b30);
  }
`);class l extends HTMLElement{container=null;input=null;error=null;validators={};customMask=null;customValidation=null;constructor(){if(super(),this.attachShadow({mode:"open"}),!this.shadowRoot)return;this.shadowRoot.adoptedStyleSheets=[o];const t=this.getAttribute("size")||"md",e=this.getAttribute("aside"),r=this.getAttribute("title")??"",n=this.getAttribute("placeholder")??"";this.shadowRoot.innerHTML=`<div class="container ${t}">
      <div class="title-wrapper">
        <span class="title">${r}</span>
        <slot name="title-aside"></slot>
      </div>
      <div class="input-wrapper">
        <input type="text" class="input" placeholder="${n}" />
        ${e?`<span class="aside">${e}</span>`:""}
      </div>
      <span class="error"></span>
    </div>`,this.handleInput=this.handleInput.bind(this),this.handleBlur=this.handleBlur.bind(this),this.validators=this.getValidators()}handleInput(t){const e=t.target;this.customMask&&this.customMask(e),this.error&&(this.error.textContent=""),this.container&&this.container.classList.remove("invalid")}handleBlur(){if(!this.error||!this.container)return;const{error:t,isValid:e}=this.validate();if(!e){this.error.textContent=t,this.container.classList.add("invalid");return}this.container.classList.remove("invalid"),this.container.classList.add("valid")}connectedCallback(){this.container=this.shadowRoot?.querySelector(".container")??null,this.input=this.shadowRoot?.querySelector(".input")??null,this.error=this.shadowRoot?.querySelector(".error")??null,!(!this.input||!this.error||!this.container)&&(this.input.addEventListener("input",this.handleInput),this.input.addEventListener("blur",this.handleBlur))}disconnectedCallback(){this.input&&(this.input.removeEventListener("input",this.handleInput),this.input.removeEventListener("blur",this.handleBlur))}validateAndShowError(){const{isValid:t}=this.validate();return this.handleBlur(),t}validate(){const t=this.input?.value??"";let e="";return t&&this.customValidation&&(e=this.customValidation(t)),this.validators.required&&!t&&(e="Поле обязательно"),this.validators.email&&t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)&&(e="Неверный Email"),{isValid:e==="",error:e}}getValidators(){return{required:this.hasAttribute("required"),email:this.hasAttribute("email")}}get value(){return this.input?.value}}customElements.define("ui-input",l);
