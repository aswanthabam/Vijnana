import logo from "../../assets/Logo KBM.png";
import style from "./Footer.module.css";
interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className={style.footer}>
      <div className={style.grid}>
        <div className={style.contact}>
          <h2 className="underline">Contact</h2>
          <ul>
            <li>
              Phone : <a href="tel:9999999999">9999999999</a>
            </li>
            <li>
              Email : <a href="tel:9999999999">mail@mail.com</a>
            </li>
            <li>
              <i className="bi bi-geo"></i>
              <br />
              <div style={{ display: "block" }}>
                &nbsp; KBM Government College
                <br />
                Olavilam, Chokli, Kannur <br />
                Pin Code : 670662
              </div>
            </li>
          </ul>
        </div>
        <div className={style.Links}>
          <h2 className="underline">Links</h2>
          <ul>
            <li>Bla bla bla</li>
            <li>Bla bla bladfdsf</li>
            <li>Bla b</li>
            <li>Bla bla </li>
            <li>Bla bla blvca</li>
          </ul>
        </div>
        <div className={style.logo}>
          <img src={logo} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
