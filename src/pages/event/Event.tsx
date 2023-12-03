import style from "./Event.module.css";
// import SecondaryButton from '../../components/buttons/secondary_button/SecondaryButton';
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { _EventInfo } from "../../types";
import { getEvents } from "../../apis/eventApi";
import { useParams } from "react-router-dom";
import { useLoader } from "../../components/toploader/useLoader";
import { useToast } from "../../components/toast/useToast";
// for build commit
interface EventProps {
  // event: _Event;
}

const Event: React.FC<EventProps> = ({}) => {
  var { setLoaderStatus } = useLoader();
  var { setToastStatus } = useToast();

  const [event, setEvent] = useState<_EventInfo | null>(null);
  var { eventId } = useParams();
  useEffect(() => {
    getEvents(eventId, setLoaderStatus, setToastStatus).then((val) => {
      if (val) setEvent(val[0]);
      else console.log("error : no event data got");
    });
  }, []);
  return (
    <div className={style.event}>
      <div className={style.page}>
        {event && (
          <div className={style.content}>
            <h2 className="underline start">{event.name}</h2>
            <br />
            <div className={style.info}>
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
            </div>
            <p dangerouslySetInnerHTML={{ __html: event.details }}></p>
            <div className={style.buttons}>
              <a href={event.reg_link}>Register</a>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Event;
