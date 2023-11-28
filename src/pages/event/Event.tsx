import style from "./Event.module.css";
// import SecondaryButton from '../../components/buttons/secondary_button/SecondaryButton';
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { _EventInfo } from "../../types";
import { getEvents } from "../../apis/api";
import { useParams } from "react-router-dom";
// for build commit
interface EventProps {
  // event: _Event;
}

const Event: React.FC<EventProps> = ({}) => {
  const [event, setEvent] = useState<_EventInfo>({
    id: "myis",
    name: "Event Name",
    description:
      "Cillum quis sint adipisicing culpa ut. Do exercitation fugiat sint culpa adipisicing et. Ea minim reprehenderit cupidatat ut id officia id adipisicing nostrud reprehenderit esse. Irure ad commodo excepteur incididunt velit et nulla minim in enim. Minim esse velit dolor cupidatat cupidatat eu aliqua enim excepteur irure.",
    link: "https://google.com",
    img: "https://png.pngtree.com/thumb_back/fh260/background/20201022/pngtree-abstract-technology-background-line-high-tech-electricity-image_430309.jpg",
    date: "15 Oct 2022",
    time: "12 Pm IST",
    venue: "MSc Lab",
    is_open: true,
    details:
      "Exercitation occaecat sunt non Lorem aliqua aliquip consectetur sint voluptate exercitation dolore non. Ea aliqua labore deserunt in ex proident labore deserunt ipsum ut commodo elit mollit mollit. Sit eu eiusmod ad aliquip minim. Velit laboris nulla duis laborum excepteur magna cupidatat commodo nostrud. Cillum commodo est ullamco ullamco consectetur non ex fugiat.",
    documents: "",
    poster: "",
  });
  var { eventId } = useParams();
  useEffect(() => {
    getEvents(eventId).then((val) => {
      setEvent(val[0]);
    });
  }, []);
  return (
    <div className={style.event}>
      <div className={style.page}>
        {/* <img className={style.image} src={event.img} /> */}
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
            <a href={event.link}>Register</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Event;
