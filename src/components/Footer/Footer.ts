import logoVisaSrc from "../../assets/logo/visa-logo.svg";
import logoMasterCardSrc from "../../assets/logo/master-card-logo.svg";
import logoMirSrc from "../../assets/logo/mir-logo.svg";
import iconLockSrc from "../../assets/icons/ic-lock.svg";

const footerStyles = new CSSStyleSheet();

footerStyles.replaceSync(`
  .footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    min-height: 200px;
    background: linear-gradient(180deg, #F2F2F2 0%, rgba(242, 242, 242, 0) 100%);
  }

  .logos-list {
    display: flex;
    gap: 7px;
    list-style-type: none;
  }

  .logo {
    width: 54px;
    height: 32px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .logo.visa {
    background-image: url("${logoVisaSrc}");
  }

  .logo.master-card {
    background-image: url("${logoMasterCardSrc}");
  }

  .logo.mir {
    background-image: url("${logoMirSrc}");
  }

  .info-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 209px;
  }

  .info {
    position: relative;
    padding-left: 24px;
    font-size: 11px;
    color: #A6A6A6;
  }

  .info::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background-image: url("${iconLockSrc}");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .order {
    font-size: 11px;
    color: #A6A6A6;
  }
`);

const orderNumber = "112480";

class CFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (!this.shadowRoot) return;

    this.shadowRoot.adoptedStyleSheets = [footerStyles];
    this.shadowRoot.innerHTML = `
      <footer class="footer">
        <div class="logos-wrapper">
          <ul class="logos-list">
            <li class="logo visa"></li>
            <li class="logo master-card"></li>
            <li class="logo mir"></li>
          </ul>
        </div>
        <div class="info-wrapper">
          <span class="info">Данные банковской карты будут переданы в зашифрованном виде</span>
        </div>
        <div class="order-wrapper">
          <span class="order">Заказ №${orderNumber}</span>
        </div>
      </footer>
    `;
  }
}

customElements.define("c-footer", CFooter);

export default CFooter;
