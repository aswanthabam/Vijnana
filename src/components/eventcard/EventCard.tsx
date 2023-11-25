import { Link, useNavigate } from "react-router-dom";
import LoginButton from "../buttons/LoginButton/LoginButton";
import style from "./EventCard.module.css";
import logo from "../../assets/logo.png";
import SecondaryButton from "../buttons/secondary_button/SecondaryButton";
interface EventCardProps {
  event: _Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const redirect = useNavigate();
  const handleLoginClick = () => {
    redirect("/register");
  };
  return (
    <div className={style.eventCard}>
      <div className={style.top}>
        <img src={event.img} />
      </div>
      <div className={style.content}>
        <h1>{event.name}</h1>
        <span>{event.description}</span>
      </div>
      <div className={style.buttons}>
        <Link className="primary-button" to={"/event/" + event.id}>
          Learn More
        </Link>
        <Link
          className="primary-button"
          to={"/event/" + event.id + "/register"}
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
