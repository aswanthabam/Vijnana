import style from "./EventListSmall.module.css";
import { useEffect, useState } from "react";
import { getEvents } from "../../apis/eventApi";
import { _Event } from "../../utils/types";
import { useLoader } from "../toploader/useLoader";
import { useToast } from "../toast/useToast";
import EventCardSmall from "../eventcardsmall/EventCardSmall";
interface EventListSmallProps {
  limit?: number;
  gctian: boolean;
}

const EventListSmall: React.FC<EventListSmallProps> = ({
  limit = undefined,
  gctian,
}) => {
  var { addLoader } = useLoader();
  var { setToastStatus } = useToast();
  const [events, setEvents] = useState<Array<_Event>>([]);
  useEffect(() => {
    getEvents(null, addLoader, setToastStatus, limit, gctian).then((e) => {
      if (e) setEvents(e);
      else console.log("error : no event data got");
    });
  }, []);

  return (
    <div className={style.eventlist}>
      {events.map((event) => {
        return <EventCardSmall event={event} />;
      })}
    </div>
  );
};

export default EventListSmall;
