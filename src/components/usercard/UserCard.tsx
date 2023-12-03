import style from "./UserCard.module.css";
import { _Event, _UserDetails } from "../../types";
import { useEffect } from "react";
import defaultProfile from "../../assets/frlIf.png";

interface UserCardProps {
  details: _UserDetails;
}

const UserCard: React.FC<UserCardProps> = ({ details }) => {
  //   useEffect(() => {});
  var year: string;
  if (details.year == 1) year = "1st Year";
  else if (details.year == 2) year = "2nd Year";
  else if (details.year == 3) year = "3rd Year";
  else year = details.year + " Year";
  return (
    <div className={style.userCard}>
      <div className={style.top}>
        <div className={style.img}>
          <img src={details.picture ? details.picture : defaultProfile} />
        </div>
        <div className={style.details}>
          <h2 className={style.name}>{details.name}</h2>
          <span className={style.college}>{details.college}</span>
          <span className={style.course}>
            {details.course} - {year}
          </span>
        </div>
      </div>
      <div className={style.bottom}>
        <span className={style.userId}>
          <span className={style.email}>{details.email}</span>
          <span>{details.userId}&nbsp; &nbsp;</span>
        </span>
        <div className={style.participate}>{""}</div>
      </div>
    </div>
  );
};

export default UserCard;
