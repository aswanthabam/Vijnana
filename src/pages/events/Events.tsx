import style from "./Events.module.css";
// import SecondaryButton from '../../components/buttons/secondary_button/SecondaryButton';
import EventList from "../../components/eventlist/EventList";
import Footer from "../../components/footer/Footer";
// for build commit
interface EventsProps {}

const Events: React.FC<EventsProps> = ({}) => {
  return (
    <div className={style.events}>
      <div className={style.page}>
        <h2 className="underline start">Events</h2>
        <br />
        <span className={style.intro}>
          Explore the dynamic world of innovation and knowledge at our college's
          technical fest. Dive into a diverse range of intellectually
          stimulating events designed to challenge, inspire, and showcase the
          brilliance of our student community. From coding competitions to
          robotics challenges, our events page is a gateway to a thrilling
          journey of creativity and skill.
        </span>
        <hr />
        <br />
        <EventList />
      </div>
      <Footer />
    </div>
  );
};

export default Events;
