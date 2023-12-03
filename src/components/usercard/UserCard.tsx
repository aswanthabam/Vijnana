import style from "./UserCard.module.css";
import { _Event, _UserDetails } from "../../types";
import { useEffect } from "react";
import defaultProfile from "../../assets/frlIf.png";

interface UserCardProps {
  details: _UserDetails;
  participations: [] | null;
}

const UserCard: React.FC<UserCardProps> = ({ details, participations }) => {
  //   useEffect(() => {});
  var year: string;
  if (details.year == 1) year = "1st Year";
  else if (details.year == 2) year = "2nd Year";
  else if (details.year == 3) year = "3rd Year";
  else year = details.year + " Year";
  console.log(participations);
  var pars = "";
  if (!participations || participations!.length < 1)
    pars = "<span>Not Registered in any events!</span>";
  else {
    for (var i = 0; i < participations!.length; i++) {
      pars += "<span>" + (participations![i] as any)["name"] + "</span>";
      //   if (i < participations!.length - 1) {
      //     pars += ", ";
      //   }
    }
  }
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
        <div className={style.participate}>
          <h5>Registered Events</h5>
          <div
            className={style.events}
            dangerouslySetInnerHTML={{ __html: pars }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
