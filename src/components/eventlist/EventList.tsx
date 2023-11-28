import style from "./EventList.module.css";
import { useEffect, useState } from "react";
import EventCard from "../eventcard/EventCard";
import { getEvents } from "../../apis/api";
import { _Event } from "../../types";
interface EventListProps {}

const EventList: React.FC<EventListProps> = ({}) => {
  const [events, setEvents] = useState<Array<_Event>>([]);
  useEffect(() => {
    getEvents(null).then((e) => {
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
