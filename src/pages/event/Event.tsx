import style from "./Event.module.css";
// import SecondaryButton from '../../components/buttons/secondary_button/SecondaryButton';
import alien from "../../assets/dehill-spacelove-1-dribble.gif";
import Counter from "../../components/counter/Counter";
import EventList from "../../components/eventlist/EventList";
import Footer from "../../components/footer/Footer";
// for build commit
interface EventProps {
  event: _Event;
}

const Event: React.FC<EventProps> = ({ event }) => {
  return (
    <div className={style.event}>
      <div className={style.page}>
        <h2 className="underline start">{event.name}</h2>
        <br />
        <p>{event.description}</p>
        <div className={style.buttons}>
          <a href={event.link}>Register</a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Event;
