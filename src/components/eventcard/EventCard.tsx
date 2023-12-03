import { Link } from "react-router-dom";
import style from "./EventCard.module.css";
import { _Event } from "../../utils/types";
interface EventCardProps {
  event: _Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className={style.eventCard}>
      <div className={style.top}>
        {/* <img src={event.img} /> */}
        <h1 className="underline w50">{event.name}</h1>
        <div className={style.overlay}></div>
      </div>
      <div className={style.content}>
        <span className={style.datecard}>
          <span className={style.date}>
            <i className="bi bi-calendar2-x"></i>&nbsp; Date : {event.date}{" "}
            <br />
          </span>
          <span className={style.time}>
            <i className="bi bi-alarm"></i>&nbsp; Time : {event.time}
          </span>
          <span className={style.venue}>
            <i className="bi bi-geo-alt"></i>&nbsp; Venue : {event.venue}
          </span>
        </span>
        <span className={style.description}>{event.description}</span>
      </div>
      <div className={style.buttons}>
        <Link className="primary-button" to={"/event/" + event.id}>
          Learn More
        </Link>
        <a href={event.reg_link} className="primary-button clr2">
          Register
        </a>
      </div>
    </div>
  );
};

export default EventCard;
