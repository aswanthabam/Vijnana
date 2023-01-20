import "./UserCard.css";
import {useSelector} from "react-redux";
import {getMyDetails} from "../../services/UserService";
import {useNotification} from "../../helper";
import {useEffect,useState} from "react"
import {useNavigate} from "react-router-dom";
export default function UserCard(){
  const state = useSelector(state => state);
  const showNotification = useNotification();
  const redirect = useNavigate();
  const [user,setUser] = useState({});
  useEffect(()=>{
    if(!state.is_logged) return;
    getMyDetails(state.user.userId,state.user.token).then(res =>{
     //showNotification(JSON.stringify(res.data),"info",false);
     // document.getElementsByClassName("email")[0].textContent = JSON.stringify(res.data);
     if(res.data.status == 200){
       setUser(res.data.content);
     }else{
       setUser({});
       showNotification("An error occured. please re-login","error");
       redirect("/register");
     }
      //showNotification("hi");
    }).catch(err=>{
      setUser({});
      showNotification("An error occured. please re-login","error");
      redirect("/register");
      //showNotification(JSON.stringify(err));
    });
  },[state.is_logged,state.user]);
  return (
    <div className="user-card">
     <div>
     <img className="profile" src={user.picture ? user.picture : "/profile.png"} alt="Profile"/>
     </div>
     <div className="details">
      <span className="name">{user.name ? user.name : "Loading Details..."}</span>
      <span className="email">{(state.is_logged && state.user) && state.user.email}</span>
      <span className="userId">ID :{(state.is_logged && state.user) && state.user.userId}</span>
      </div>
    </div>
  );
}