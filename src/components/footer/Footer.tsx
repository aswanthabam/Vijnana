// import logo from "../../assets/Logo KBM.png";
import style from "./Footer.module.css";
// import GoogleMapReact from "google-map-react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className={style.footer}>
      <div className={style.grid}>
        <div className={style.contact}>
          <h2 className="underline start">Contact</h2>
          <ul>
            <li>
              <i className="bi bi-telephone-fill"></i> &nbsp;{" "}
              <a href="tel: +91 977 816 4335"> +91 977 816 4335</a>
            </li>
            <li>
              <i className="bi bi-envelope"></i> &nbsp;
              <a href="mailto:gctcsiqac@gmail.com">gctcsiqac@gmail.com</a>
            </li>
            <li>
              <i className="bi bi-geo"></i> &nbsp; Olavilam, Chokli, Kannur{" "}
              <br />
              Pin Code : 670662
            </li>
          </ul>
        </div>
        <div className={style.Links}>
          <h2 className="underline start">Links</h2>
          <ul>
            <li>
              <a href="http://govtcollegetly.ac.in/">College Website</a>
            </li>
            <li>
              <a href="https://kannuruniversity.ac.in/">Kannur University</a>
            </li>
            <li>
              <a href="https://nationalseminarkbmgctly.web.app/">
                National Seminar KBMGCT
              </a>
            </li>
            <li>
              <a href="https://instagram.com/vijnana23">Instagram</a>
            </li>
            <li>
              <a href="https://facebook.com/vijnana">Facebook</a>
            </li>
          </ul>
        </div>
        <div className={style.logo}>
          <object
            // style="border:0; height: 450px; width: 100%;"
            data="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9291.641740467927!2d75.55760033930248!3d11.718892280617597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba42828416ed211%3A0x4c95cfa71eed1053!2sKodiyeri%20Balakrishnan%20Memorial%20Govt%20College%2C%20Chokli!5e0!3m2!1sen!2sin!4v1701154594725!5m2!1sen!2sin"
          ></object>
          {/* <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          ></GoogleMapReact> */}
          {/* <img src={logo} /> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
