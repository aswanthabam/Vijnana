import Footer from "../../components/footer/Footer";
import style from "./About.module.css";
interface AboutProps {
  // About: _About;
}

const About: React.FC<AboutProps> = ({}) => {
  return (
    <div className={style.about}>
      <div className={style.page}>
        <h2 className="underline start">About Us</h2>
      </div>
      <Footer />
    </div>
  );
};

export default About;
