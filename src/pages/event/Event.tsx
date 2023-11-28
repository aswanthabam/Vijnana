import style from "./Event.module.css";
// import SecondaryButton from '../../components/buttons/secondary_button/SecondaryButton';
import alien from "../../assets/dehill-spacelove-1-dribble.gif";
import Counter from "../../components/counter/Counter";
import EventList from "../../components/eventlist/EventList";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    setEvent({
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
      details: `&nbsp; Ea irure ad eu eiusmod eiusmod aliquip voluptate consectetur. Ipsum minim veniam commodo consectetur Lorem sint est adipisicing fugiat laborum duis enim aliqua. Exercitation laborum sint in ex laboris magna aute voluptate anim enim pariatur voluptate. Nulla irure tempor sint magna dolore ut qui. Deserunt cillum pariatur duis ipsum nulla minim nostrud anim id. Ullamco fugiat amet adipisicing sunt culpa ut ad qui tempor consectetur. Ad consectetur deserunt proident occaecat ex in Lorem cillum ut dolore aute ipsum enim ut.<br/>
<br/>
&nbsp; Non ex ullamco ipsum elit occaecat quis et duis duis duis occaecat. Proident labore velit aliqua tempor tempor. Duis ea officia aliquip veniam ex enim aute pariatur nostrud excepteur. Aute non dolore fugiat cupidatat amet. Cupidatat irure magna anim consectetur ex eu irure ullamco do dolore nostrud. Laboris sint sit consequat deserunt nostrud.<br/>
<br/>
&nbsp; Eu incididunt labore cillum ex. Anim consectetur cillum adipisicing laborum cupidatat aliqua. Dolor tempor commodo minim reprehenderit dolor proident consequat non nisi elit aute Lorem. Adipisicing eu ut ea nostrud dolor Lorem nulla reprehenderit qui tempor.<br/>
<br/>
&nbsp; Et Lorem anim amet ad ullamco enim voluptate adipisicing. Sunt minim eiusmod incididunt ipsum in esse nostrud in deserunt et veniam nulla. Ullamco ut ut sint do reprehenderit labore voluptate sunt et consequat.<br/>
<br/>
&nbsp; Lorem enim laborum voluptate dolor dolore est voluptate sit incididunt adipisicing mollit excepteur est. Irure officia amet incididunt duis Lorem exercitation commodo aliqua occaecat dolore enim. Nostrud incididunt in minim et laborum magna officia ea sint qui irure. Dolor laboris eiusmod nostrud commodo nisi sit labore laborum nisi. Ex magna nostrud duis dolor non est occaecat eu adipisicing proident non culpa aliqua. Voluptate pariatur laborum duis occaecat aliquip officia cupidatat exercitation dolore non.<br/>`,
      documents: "",
      poster: "",
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
          <h3 className="underline start clr2">About the Event</h3>
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
