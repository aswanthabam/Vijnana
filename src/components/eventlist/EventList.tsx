import style from "./EventList.module.css";
import { useEffect, useState } from "react";
import EventCard from "../eventcard/EventCard";
import { getEvents } from "../../apis/eventApi";
import { _Event } from "../../types";
import { useLoader } from "../toploader/useLoader";
import { useToast } from "../toast/useToast";
interface EventListProps {}

const EventList: React.FC<EventListProps> = ({}) => {
  var { setLoaderStatus } = useLoader();
  var { setToastStatus } = useToast();
  const [events, setEvents] = useState<Array<_Event>>([]);
  useEffect(() => {
    getEvents(null, setLoaderStatus, setToastStatus).then((e) => {
      console.log(e);
      setEvents(e);
    });
  }, []);

  return (
    <div className={style.eventList}>
      {events.map((event) => {
        return <EventCard event={event} />;
      })}
    </div>
  );
};

export default EventList;
