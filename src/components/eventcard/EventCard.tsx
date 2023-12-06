import { Link } from "react-router-dom";
import style from "./EventCard.module.css";
import { _Event } from "../../utils/types";
import { registerEvent } from "../../apis/eventApi";
import { useLoader } from "../toploader/useLoader";
import { useToast } from "../toast/useToast";
import { useState, useEffect } from "react";
import { ResponseStatus } from "../../apis/api";
interface EventCardProps {
  event: _Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  var { addLoader } = useLoader();
  var { setToastStatus } = useToast();
  const [buttonText, setButtonText] = useState<string>("Register");

  useEffect(() => {
    console.log(event);
    if (event.closed) setButtonText("Registration Closed");
    else if (!event.is_reg) setButtonText("OPEN");
    else if (event.participate_in) setButtonText("Registered");
    // else if (event.gctian_only)
    //   setButtonText("You cant register for this event");
    else setButtonText("Register");
  }, []);
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
        <a
          onClick={async () => {
            if (!event.closed && event.is_reg && !event.participate_in) {
              var res = await registerEvent(
                event.id,
                addLoader,
                setToastStatus
              );
              res.status == ResponseStatus.SUCCESS &&
                setButtonText("Registered");
            }
          }}
          href="#"
          className={
            "primary-button" +
            (!event.closed && event.is_reg && !event.participate_in
              ? " clr2"
              : " clr1")
          }
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default EventCard;
