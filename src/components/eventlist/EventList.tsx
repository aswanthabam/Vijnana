import style from "./EventList.module.css";
import { useEffect, useState } from "react";
import EventCard from "../eventcard/EventCard";
interface EventListProps {}

const EventList: React.FC<EventListProps> = ({}) => {
  const [events, setEvents] = useState<Array<_Event>>([]);
  useEffect(() => {
    setEvents([
      {
        id: "myis",
        name: "Event Name",
        description:
          "Cillum quis sint adipisicing culpa ut. Do exercitation fugiat sint culpa adipisicing et. Ea minim reprehenderit cupidatat ut id officia id adipisicing nostrud reprehenderit esse. Irure ad commodo excepteur incididunt velit et nulla minim in enim. Minim esse velit dolor cupidatat cupidatat eu aliqua enim excepteur irure.",
        link: "https://google.com",
        img: "https://png.pngtree.com/thumb_back/fh260/background/20201022/pngtree-abstract-technology-background-line-high-tech-electricity-image_430309.jpg",
        date: "15 Oct 2022",
        time: "12 Pm IST",
        venue: "MSc Lab",
      },
      {
        id: "myis",
        name: "Event Name",
        description:
          "Cillum quis sint adipisicing culpa ut. Do exercitation fugiat sint culpa adipisicing et. Ea minim reprehenderit cupidatat ut id officia id adipisicing nostrud reprehenderit esse. Irure ad commodo excepteur incididunt velit et nulla minim in enim. Minim esse velit dolor cupidatat cupidatat eu aliqua enim excepteur irure.",
        link: "https://google.com",
        img: "https://png.pngtree.com/thumb_back/fh260/background/20201022/pngtree-abstract-technology-background-line-high-tech-electricity-image_430309.jpg",
        date: "15 Oct 2022",
        time: "12 Pm IST",
        venue: "MSc Lab",
      },
      {
        id: "myis",
        name: "Event Name",
        description:
          "Cillum quis sint adipisicing culpa ut. Do exercitation fugiat sint culpa adipisicing et. Ea minim reprehenderit cupidatat ut id officia id adipisicing nostrud reprehenderit esse. Irure ad commodo excepteur incididunt velit et nulla minim in enim. Minim esse velit dolor cupidatat cupidatat eu aliqua enim excepteur irure.",
        link: "https://google.com",
        img: "https://png.pngtree.com/thumb_back/fh260/background/20201022/pngtree-abstract-technology-background-line-high-tech-electricity-image_430309.jpg",
        date: "15 Oct 2022",
        time: "12 Pm IST",
        venue: "MSc Lab",
      },
    ]);
  });

  return (
    <div className={style.eventList}>
      {events.map((event) => {
        return <EventCard event={event} />;
      })}
    </div>
  );
};

export default EventList;
