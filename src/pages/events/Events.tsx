import style from "./Events.module.css";
// import SecondaryButton from '../../components/buttons/secondary_button/SecondaryButton';
import alien from "../../assets/dehill-spacelove-1-dribble.gif";
import Counter from "../../components/counter/Counter";
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
        <EventList />
      </div>
      <Footer />
    </div>
  );
};

export default Events;
