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
        <p>
          Sunt aliqua amet eiusmod duis id velit minim minim. Ut nulla aute in
          ut sint est aliquip anim labore id elit est magna ipsum. Commodo
          veniam fugiat officia sit minim magna. Amet culpa ad amet occaecat ad
          sunt sunt occaecat Lorem. In anim reprehenderit sint duis cillum do
          laborum ullamco id sint officia Lorem. Ut exercitation sint esse
          occaecat esse duis aliquip. Ea eu sint cillum proident veniam ea magna
          deserunt adipisicing commodo cillum. Irure cillum reprehenderit
          voluptate adipisicing aliqua magna occaecat irure consectetur ut in et
          sint anim. Consequat culpa nulla incididunt id magna duis sint nulla
          Lorem ullamco. Nisi anim quis tempor esse sit sint id minim non sunt.
          Consequat mollit in eiusmod sint duis exercitation laborum cupidatat
          cillum ad culpa minim veniam ut. Pariatur esse veniam nisi sit aliquip
          enim. Amet voluptate nisi minim sunt est. Anim consequat voluptate
          pariatur ex commodo minim amet pariatur aliquip ipsum duis voluptate.
          Amet laboris qui reprehenderit consectetur incididunt mollit
          incididunt amet laborum ipsum. Pariatur occaecat pariatur dolor labore
          proident cupidatat commodo ipsum id cillum sit. Cillum est do eu sint
          enim laborum. Officia irure deserunt commodo ullamco deserunt amet.
          Amet velit nulla veniam aliqua anim consectetur sit reprehenderit
          deserunt. Dolore non adipisicing aliquip aliqua ipsum est id ipsum
          magna cillum.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
