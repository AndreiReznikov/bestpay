import"./main-Cy6FS0cG.js";import"./Input-DjRCLh1e.js";const g=(o,i=2)=>{const a=o.selectionStart||0,r=o.value,l=(r.substring(0,a).match(/\d/g)||[]).length,m=(r.substring(0,a).match(/,/g)||[]).length;let t=o.value.replace(/\s/g,"");const h=r.length<t.length&&t.includes(",")&&!r.includes(",");if(h){const e=t.indexOf(",");t.substring(0,e)===""&&(t="0"+t)}if(t.startsWith(",")&&!h&&(t="0"+t),t=t.replace(/[^\d,]/g,""),t.length>1&&t!=="0,"&&!t.startsWith("0,")&&(t=t.replace(/^0+/,"")),t===""&&r==="0"&&(t="0"),(t.match(/,/g)||[]).length>1){const e=t.indexOf(",");t=t.slice(0,e+1)+t.slice(e+1).replace(/,/g,"")}if(t.includes(",")){const e=t.split(",");e[1].length>i&&(e[1]=e[1].slice(0,i),t=e.join(","))}let s=t;if(t&&t!=="0"){const e=t.split(",");e[0].length>0&&e[0]!=="0"?e[0]=e[0].replace(/\B(?=(\d{3})+(?!\d))/g," "):e[0]==="0"&&e.length>1&&(s="0,"+(e[1]||"")),s=e.join(",")}if(r!==s){o.value=s;let e=0;if(t){let n=l;m>0&&(n=l),h&&n++;const[b]=t.split(","),c=b.length;let u=0;if(n<=c){for(let p=3;p<n;p+=3)u++;e=n+u}else{for(let f=3;f<=c;f+=3)u++;const p=n-c-1;e=c+u+1+p}}e=Math.min(e,s.length),o.setSelectionRange(e,e)}},w=o=>{const i=parseFloat(o.replace(/\s/g,"").replace(",","."));return i<1||i>1e6?"Сумма должна быть от 1 до 1 000 000₽":""},y=o=>o.length>200?"Не больше 200 символов":"",x=new CSSStyleSheet;x.replaceSync(`
  :host {
    display: inline-flex;
    max-width: 412px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 48px 56px;
    border-radius: 12px;
    box-shadow: 0px 4px 16px 0px var(--color-shadow, #40404029);
  }

  @media (max-width: 768px) {
    .form {
      padding: 0;
      box-shadow: none;
    }
  }

  .title {
    margin: 0;
    padding: 0;
    color: var(--color-text-secondary, #595959);
  }

  .inputs-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`);class S extends HTMLElement{button=null;moneyInput=null;textarea=null;constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[x],this.shadowRoot.innerHTML=`<form class="form">
      <h2 class="title">Создание заказа</h2>
      <section class="inputs-wrapper">
        <ui-input
          class="money"
          title="Введите сумму заказа"
          placeholder="0"
          aside="₽"
          required
        ></ui-input>
        <ui-input
          class="email"
          title="Email"
          placeholder="example@mail.com"
          email
          required
        ></ui-input>
        <ui-textarea
          class="textarea"
          title="Описание"
          placeholder="Что-то о заказе"
          required
        ></ui-textarea>
      </section>
      <ui-button class="button">Создать</ui-button>
    </form>`,this.handleSubmit=this.handleSubmit.bind(this))}connectedCallback(){this.button=this.shadowRoot?.querySelector(".button")??null,this.moneyInput=this.shadowRoot?.querySelector(".money")??null,this.textarea=this.shadowRoot?.querySelector(".textarea")??null,this.bindMasks(),this.bindValidation(),this.button?.addEventListener("click",this.handleSubmit)}disconnectedCallback(){this.button?.removeEventListener("click",this.handleSubmit)}bindValidation(){setTimeout(()=>{this.moneyInput&&(this.moneyInput.customValidation=w),this.textarea&&(this.textarea.customValidation=y)},0)}bindMasks(){setTimeout(()=>{this.moneyInput&&(this.moneyInput.customMask=g)},0)}handleSubmit=i=>{i.preventDefault(),this.validate()&&this.button&&(this.button.loading=!0,setTimeout(()=>{window.location.href="/payment.html"},500))};validate(){const i=this.shadowRoot?.querySelectorAll("ui-input, ui-textarea")??[];let a=!0;return i.forEach(r=>{if(typeof r.validateAndShowError=="function"){const l=r.validateAndShowError();a=a&&l}}),a}}customElements.define("c-unipay-form",S);const v=new CSSStyleSheet;v.replaceSync(`
  .container {
    display: flex;
    flex-direction: column;
    max-width: 319px;
    width: 100%;
  }

  .container.invalid * {
    color: var(--color-error, #ff3b30);
  }

  .container.invalid .textarea {
    border-bottom: 1px solid var(--color-error, #ff3b30);
  }

  .title {
    margin-bottom: 14px;
    font-size: 12px;
    color: var(--color-text-primary, #a6a6a6);
  }

  .textarea {
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    color: var(--color-text-secondary, #595959);
    border: none;
    border-bottom: 1px solid var(--color-border, #f2f2f2);
    outline: none;
    letter-spacing: 0;
    caret-color: var(--color-primary, #ff335f);
    resize: none;
  }

  .textarea::placeholder {
    color: var(--color-text-placeholder, #f2f2f2);
  }

  .textarea:focus {
    border-bottom: 1px solid var(--color-border-hover, #ff335f);
  }

  @media (hover: hover) {
    .textarea:hover {
      border-bottom: 1px solid var(--color-border-hover, #ff335f);
    }
  }

  .error {
    min-height: 1rem;
    margin-top: 4px;
    font-size: 12px;
    color: var(--color-error, #ff3b30);
  }
`);class C extends HTMLElement{container=null;textarea=null;error=null;validators={};customValidation=null;constructor(){if(super(),this.attachShadow({mode:"open"}),!this.shadowRoot)return;const i=this.getAttribute("title")??"",a=this.getAttribute("placeholder")??"";this.shadowRoot.adoptedStyleSheets=[v],this.shadowRoot.innerHTML=`<div class="container">
      <span class="title">${i}</span>
      <textarea
        class="textarea"
        rows="2"
        placeholder="${a}"
      ></textarea>
      <span class="error"></span>
    </div>`,this.handleInput=this.handleInput.bind(this),this.handleBlur=this.handleBlur.bind(this),this.adjustHeight=this.adjustHeight.bind(this),this.validators=this.getValidators()}validateAndShowError(){const{isValid:i}=this.validate();return this.handleBlur(),i}handleInput=()=>{!this.error||!this.container||(this.error.textContent="",this.container.classList.remove("invalid"),this.adjustHeight(2,3))};handleBlur=()=>{if(!this.error||!this.container)return;const{error:i,isValid:a}=this.validate();if(!a){this.error.textContent=i,this.container.classList.add("invalid");return}this.container.classList.remove("invalid"),this.container.classList.add("valid")};connectedCallback(){this.container=this.shadowRoot?.querySelector(".container")??null,this.textarea=this.shadowRoot?.querySelector(".textarea")??null,this.error=this.shadowRoot?.querySelector(".error")??null,!(!this.textarea||!this.error||!this.container)&&(this.textarea.addEventListener("input",this.handleInput),this.textarea.addEventListener("blur",this.handleBlur),setTimeout(()=>this.adjustHeight(2,3),0))}disconnectedCallback(){this.textarea&&(this.textarea.removeEventListener("input",this.handleInput),this.textarea.removeEventListener("blur",this.handleBlur))}adjustHeight(i=2,a=3){if(!this.textarea)return;const r=this.textarea.value,l=this.textarea.selectionStart,m=this.textarea.selectionEnd;this.textarea.style.height="auto",this.textarea.style.overflow="hidden";const t=parseInt(getComputedStyle(this.textarea).lineHeight)||27,h=this.textarea.scrollHeight;let d=Math.ceil(h/t);r||(d=i);const s=Math.min(a,Math.max(i,d));this.textarea.rows=s,d>a?this.textarea.style.overflowY="auto":this.textarea.style.overflowY="hidden",this.textarea.setSelectionRange(l,m)}validate(){const i=this.textarea?.value??"";let a="";return i&&this.customValidation&&(a=this.customValidation(i)),this.validators.required&&!i&&(a="Поле обязательно"),{isValid:a==="",error:a}}getValidators(){return{required:this.hasAttribute("required")}}get value(){return this.textarea?.value}}customElements.define("ui-textarea",C);
