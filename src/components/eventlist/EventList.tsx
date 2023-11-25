import { Link, useNavigate } from "react-router-dom";
import LoginButton from "../buttons/LoginButton/LoginButton";
import style from "./EventList.module.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import EventCard from "../eventcard/EventCard";
interface EventListProps {}

const EventList: React.FC<EventListProps> = ({}) => {
  const [events, setEvents] = useState<Array<_Event>>([
    {
      id: "myis",
      name: "Event Name",
      description: "Event descripiton",
      link: "https://google.com",
      img: "https://png.pngtree.com/thumb_back/fh260/background/20201022/pngtree-abstract-technology-background-line-high-tech-electricity-image_430309.jpg",
    },
    {
      id: "myis",
      name: "Event Name",
      description: "Event descripiton",
      link: "https://google.com",
      img: "https://png.pngtree.com/thumb_back/fh260/background/20201022/pngtree-abstract-technology-background-line-high-tech-electricity-image_430309.jpg",
    },
  ]);
  return (
    <div className={style.eventList}>
      {events.map((event) => {
        return <EventCard event={event} />;
      })}
    </div>
  );
};

export default EventList;
