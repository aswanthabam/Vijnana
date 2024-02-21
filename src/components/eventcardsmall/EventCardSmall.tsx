import style from "./EventCardSmall.module.css";
import { _Event } from "../../utils/types";
import { registerEvent } from "../../apis/eventApi";
import { useLoader } from "../toploader/useLoader";
import { useToast } from "../toast/useToast";
import { useState, useEffect } from "react";
import { ResponseStatus } from "../../apis/api";
interface EventCardSmallProps {
  event: _Event;
}

const EventCardSmall: React.FC<EventCardSmallProps> = ({ event }) => {
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
      <div className={style.left}>
        <p className={style.time}>
          {event.date}, {event.time}
        </p>
        <h3>{event.name}</h3>
        <p className={style.description}>{event.description}</p>
      </div>
      <div className={style.right}>
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

export default EventCardSmall;
