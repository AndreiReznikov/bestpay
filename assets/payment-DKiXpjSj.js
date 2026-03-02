import"./main-Cy6FS0cG.js";import"./Footer-gUEeG3e4.js";import"./Input-DjRCLh1e.js";const h="/bestpay/assets/bank-logo-BycS5gqS.svg",p=e=>{const t=e.selectionStart??0,i=e.value;let a=e.value.replace(/\D/g,""),o="";for(let n=0;n<a.length;n++)n>0&&n%4===0&&(o+=" "),o+=a[n];if(i!==o){e.value=o;const n=(i.substring(0,t).match(/ /g)||[]).length,d=(o.substring(0,t).match(/ /g)||[]).length,s=t+(d-n);e.setSelectionRange(s,s)}},u=e=>{let t=e.value.replace(/\D/g,"");t=t.slice(0,4),t.length>2&&(t=t.slice(0,2)+"/"+t.slice(2)),e.value=t},b=e=>{e.value=e.value.replace(/\D/g,"")},x=e=>{if(!/^\d+$/.test(e))return!1;let t=0,i=!1;for(let a=e.length-1;a>=0;a--){let o=parseInt(e.charAt(a));i&&(o*=2,o>9&&(o-=9)),t+=o,i=!i}return t%10===0},m=(e,t)=>{const i=new Date,a=i.getFullYear()%100,o=i.getMonth()+1;return!(t<a||t===a&&e<o)},f=e=>x(e.replace(/\s/g,""))?"":"Неверный номер карты",k=e=>{if(/^\d{2}\/\d{2}$/.test(e)){const[t,i]=e.split("/").map(Number);if(t<1||t>12)return"Неверно введён месяц";if(!m(t,i))return"Срок действия карты истёк"}else return"Неверный формат MM/YY";return""},v=e=>e.length<3?"Минимум три цифры":"",r=new CSSStyleSheet;r.replaceSync(`
  :host {
    display: inline-flex;
    max-width: 412px;
    width: 100%;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 100%;
  }

  .card-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    padding: 60px 56px 18px 56px;
    border-radius: 12px;
    box-shadow: 0px 4px 16px 0px var(--color-shadow, #40404029);
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    .card-wrapper {
      width: auto;
      padding: 0;
      box-shadow: none;
    }
  }


  .logo-container {
    position: absolute;
    top: 24px;
    right: 24px;
    display: flex;
    justify-content: flex-end;
  }

    @media (max-width: 768px) {
      .logo-container {
        top: -60px;
        right: 0;
      }
    }

  .logo {
    width: 55px;
    height: 47px;
    background-image: url("${h}");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }


  .card-data-wrapper {
    display: flex;
    gap: 32px;
  }

  @media (max-width: 768px) {
    .card-data-wrapper {
      gap: 5px;
    }
  }

  .checkbox {
    margin-top: 8px;
  }

  .button {
    padding-top: 50px;
  }

  .terms {
    max-width: 240px;
    margin: 0;
    font-size: 11px;
    text-align: center;
    color: var(--color-text-primary, #a6a6a6);
  }

  .terms-link {
    color: var(--color-text-secondary, #595959);
  }
`);const g="12 500₽";class w extends HTMLElement{button=null;cardInput=null;dateInput=null;cvvInput=null;constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[r],this.shadowRoot.innerHTML=`<form class="form">
      <section class="card-wrapper">
        <div class="logo-container">
          <div class="logo"></div>
        </div>
        <ui-input
          class="card"
          title="Номер карты"
          placeholder="1234 5678 1234 5678"
          required
        ></ui-input>
        <section class="card-data-wrapper">
          <ui-input
            class="date"
            title="Месяц / год"
            placeholder="ММ / ГГ"
            size="sm"
            required
          ></ui-input>
          <ui-input
            class="cvv"
            title="CVV / CVC"
            placeholder="123"
            size="sm"
            required
          >
            <ui-help-icon
              slot="title-aside"
              text="Три цифры с обратной стороны карты"
            ></ui-help-icon>
          </ui-input>
        </section>
      </section>
      <ui-checkbox
        class="checkbox"
        label="Сохранить карту для следующих покупок"
        checked
      ></ui-checkbox>
      <ui-button class="button" disabled>Оплатить ${g}</ui-button>
      <p class="terms">
        Нажимая на кнопку «‎Перевести»‎, вы соглашаетесь
        с&nbsp;<a
          class="terms-link"
          href="/mock-terms/change-me"
          target="_blank"
          >условиями оферты</a>
      </p>
    </form>`)}connectedCallback(){this.button=this.shadowRoot?.querySelector(".button")||null,this.cardInput=this.shadowRoot?.querySelector(".card")||null,this.dateInput=this.shadowRoot?.querySelector(".date")||null,this.cvvInput=this.shadowRoot?.querySelector(".cvv")||null,this.updateButtonState=this.updateButtonState.bind(this),this.handleSubmit=this.handleSubmit.bind(this),this.shadowRoot?.addEventListener("input",this.updateButtonState),this.button?.addEventListener("click",this.handleSubmit),this.bindMasks(),this.bindValidation(),this.updateButtonState()}disconnectedCallback(){this.shadowRoot?.removeEventListener("input",this.updateButtonState),this.button?.removeEventListener("click",this.handleSubmit)}bindValidation(){setTimeout(()=>{this.cardInput&&(this.cardInput.customValidation=f),this.dateInput&&(this.dateInput.customValidation=k),this.cvvInput&&(this.cvvInput.customValidation=v)})}bindMasks(){setTimeout(()=>{this.cardInput&&(this.cardInput.customMask=p),this.dateInput&&(this.dateInput.customMask=u),this.cvvInput&&(this.cvvInput.customMask=b)})}updateButtonState(){if(!this.button)return;const t=this.shadowRoot?.querySelectorAll("ui-input")||[],i=Array.from(t).every(a=>a.validate().isValid);this.button.disabled=!i}handleSubmit(t){t.preventDefault();const i=this.shadowRoot?.querySelectorAll("ui-input")||[];if(Array.from(i).every(o=>o.validateAndShowError())){this.button.loading=!0;const o=Math.random();let n;o<.33?n="success":o<.66?n="error":n="not-payed",setTimeout(()=>{window.location.href=`/bestpay/notify.html?status=${n}`},500)}}}customElements.define("c-payment-form",w);const c=new CSSStyleSheet;c.replaceSync(`
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
    font-family: Roboto;
    font-size: 15px;
    letter-spacing: 0.3px;
    color: var(--color-text-secondary, #595959);
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .label {
      font-size: 11px;
    }
  }
`);class y extends HTMLElement{checkbox=null;constructor(){if(super(),this.attachShadow({mode:"open"}),!this.shadowRoot)return;this.shadowRoot.adoptedStyleSheets=[c];const t=this.getAttribute("label")||"",i=this.hasAttribute("checked")?"checked":"",a=this.hasAttribute("disabled")?"disabled":"",o=this.getAttribute("name")||"";this.shadowRoot.innerHTML=`
      <label class="checkbox-container">
        <input
          class="checkbox"
          type="checkbox"
          ${i}
          ${a}
          name="${o}"
        />
        <span class="checkmark"></span>
        ${t?`<span class="label">${t}</span>`:""}
        <slot></slot>
      </label>
    `}connectedCallback(){this.checkbox=this.shadowRoot?.querySelector(".checkbox")??null}get checked(){return this.checkbox?.checked||!1}set checked(t){this.checkbox&&(this.checkbox.checked=t)}}customElements.define("ui-checkbox",y);const l=new CSSStyleSheet;l.replaceSync(`
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
    background: var(--color-text-placeholder, #f2f2f2);
    color: var(--color-text-primary, #a6a6a6);
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
  }

  @media (hover: hover) {
    .help-icon:hover {
      background: var(--color-text-primary, #a6a6a6);
      color: white;
    }
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
    background: var(--color-text-secondary, #595959);
    color: white;
    border-radius: 8px;
    transform: translateX(-50%);
    visibility: hidden;
    z-index: 1000;
  }

  .help-icon:focus + .tooltip {
    visibility: visible;
  }

  @media (hover: hover) {
    .help-icon:hover + .tooltip {
      visibility: visible;
    }
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
    border-top: 8px solid var(--color-text-secondary, #595959);
    border-bottom: 0;
    transform: translateX(-50%);
  }
`);class S extends HTMLElement{constructor(){if(super(),this.attachShadow({mode:"open"}),!this.shadowRoot)return;const t=this.getAttribute("text")||"";this.shadowRoot.adoptedStyleSheets=[l],this.shadowRoot.innerHTML=`
      <button
        class="help-icon"
        aria-label="Показать подсказку"
      >?</button>
      <div class="tooltip">${t}</div>
    `}}customElements.define("ui-help-icon",S);
