import "./Dashboard.css";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import Notification from "../../components/Notification/Notification";
import UserCard from "../../components/UserCard/UserCard";
import PreLoader from "../../components/PreLoader/PreLoader";
import Event from "../../components/Event/Event";
import {useSelector} from "react-redux";
import {getMyDetails} from "../../services/UserService";
import {useNotification} from "../../helper";
import {useEffect,useState} from "react"
import {useNavigate} from "react-router-dom";

export default function Dashboard(){
  const state = useSelector(state => state);
  const showNotification = useNotification();
  const redirect = useNavigate();
  const [user,setUser] = useState({loaded:false,error:false});
  useEffect(()=>{
    if(!state.is_logged){
      setUser({loaded:true,error:true});
      return;
    }
    getMyDetails(state.user.userId,state.user.token).then(res =>{
     //showNotification(JSON.stringify(res.data),"info",false);
     // document.getElementsByClassName("email")[0].textContent = JSON.stringify(res.data);
     if(res.data.status == 200){
       setUser({...res.data.content,loaded:true});
     }else{
       setUser({loaded:true,error:true});
       showNotification(res.data.description+JSON.stringify(res.data),"error");
       redirect("/register");
     }
      //showNotification("hi");
    }).catch(err=>{
      setUser({loaded:true,error:true});
      showNotification("An error occured. please re-login"+JSON.stringify(err),"error");
      redirect("/register");
      //showNotification(JSON.stringify(err));
    });
  },[state.is_logged,state.user]);
  return (
    <div className="dashboard">
      <PreLoader visible={!user.loaded}/>
      <UserCard user={user}/>
      <br/><LogoutButton/>
      <div className="registered" >
      <h3 className="underlined">Registered Events</h3>
        { user.participate &&
        <div className="container">
           { user.participate.map(event => <Event event={{...event,date:new Date(event.date)}}/> ) }
        </div>}
        {!user.participate && <span>No events registered</span>}
      </div>
    </div>
  );
};