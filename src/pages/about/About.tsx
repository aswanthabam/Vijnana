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
        <p>
          Id ex eu labore magna adipisicing tempor duis elit mollit. Ad sit
          mollit do laborum mollit. Consequat dolore in culpa exercitation
          mollit consequat consectetur do sunt proident minim est mollit
          excepteur. Pariatur aliqua dolor sunt veniam sint est esse commodo
          irure nulla aliquip minim. Ut duis sint laboris proident excepteur ea
          ut tempor reprehenderit mollit. Duis irure ad excepteur irure magna
          aute aliquip et eiusmod duis laboris. Eiusmod quis est aliqua ullamco.
          Mollit enim sint in nostrud cupidatat veniam. Ex dolore esse quis
          pariatur duis magna sit aliquip ex non eiusmod aliquip. Aliquip mollit
          incididunt magna anim non nostrud veniam laboris quis ex proident
          laboris. Et ad anim ad dolore ut. Magna adipisicing non minim deserunt
          id tempor exercitation tempor Lorem. Quis pariatur labore do cupidatat
          reprehenderit ea. Id officia eiusmod tempor dolor dolor amet labore
          reprehenderit minim aliquip exercitation cillum cillum. Ut cupidatat
          Lorem anim ad eiusmod veniam. Ut sint sint exercitation labore ipsum
          labore deserunt veniam cupidatat cupidatat. Nulla tempor enim
          reprehenderit consectetur ex aliqua esse enim deserunt incididunt ex
          laborum.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
