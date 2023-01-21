import "./UserCard.css";
import {useSelector} from "react-redux";
/*import {getMyDetails} from "../../services/UserService";
import {useNotification} from "../../helper";
import {useEffect,useState} from "react"
import {useNavigate} from "react-router-dom";*/
export default function UserCard({user}){
  const state = useSelector(state => state);
  
  return (
    <div className="user-card">
     { (user.loaded && user.name && !user.error) ? <><div>
       <img className="profile" src={user.picture ? user.picture : "/profile.png"} alt="Profile"/>
       </div>
       <div className="details">
        <span className="name">{user.name ? user.name : "Loading Details..."}</span>
        <span className="email">{(state.is_logged && state.user) && state.user.email}</span>
        <span className="userId">ID :{(state.is_logged && state.user) && state.user.userId}</span>
      </div></> : <div className="error">Not logged in</div> }
    </div>
  );
}