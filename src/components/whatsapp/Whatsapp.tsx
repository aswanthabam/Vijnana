import style from "./Whatsapp.module.css";
interface WhatsappIconProps {}

const WhatsappIcon: React.FC<WhatsappIconProps> = ({}) => {
  return (
    <a
      href="https://wa.me/9188670699"
      target="_blank"
      className={style.whatsappIcon}
    >
      <i className="bi bi-whatsapp"></i>
    </a>
  );
};

export default WhatsappIcon;
