import"./main-Cy6FS0cG.js";import"./Footer-gUEeG3e4.js";const a="/bestpay/assets/success-BM_jWi2Q.png",o="/bestpay/assets/error-DwD2PEfS.png",n="/bestpay/assets/not-payed-DSBYj9tR.png",r=t=>{switch(t){case"success":return{image:a,text:"Успешная оплата!"};case"not-payed":return{image:n,text:"Не удалось оплатить"};default:return{image:o,text:"Упс! Все сломалось... Попробуйте позже"}}},s=new CSSStyleSheet;s.replaceSync(`
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 48px;
  }

  .image {
    width: 88px;
    height: auto;
    margin-bottom: 24px;
  }

  .text {
    max-width: 312px;
    font-weight: 600;
    font-size: 24px;
    color: var(--color-text-secondary, #595959);
    text-align: center;
    margin: 0 0 16px 0;
  }
`);const c=new URLSearchParams(window.location.search),i=c.get("status")||"error",{image:l,text:e}=r(i);class m extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[s],this.shadowRoot.innerHTML=`
      <div class="container">
        <img class="image" src="${l}" alt="${e}">
        <h2 class="text">${e}</h2>
        <slot></slot>
      </div>
    `)}}customElements.define("c-notify-status",m);
