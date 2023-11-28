import Footer from "../../components/footer/Footer";
import style from "./Contact.module.css";
interface ContactProps {
  // Contact: _Contact;
}

const Contact: React.FC<ContactProps> = ({}) => {
  return (
    <div className={style.contact}>
      <div className={style.page}>
        <h2 className="underline start">Contact Us</h2>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
