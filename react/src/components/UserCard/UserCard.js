import "./UserCard.css";
import {useSelector} from "react-redux";
/*import {getMyDetails} from "../../services/UserService";
import {useNotification} from "../../helper";
import {useEffect,useState} from "react"
import {useNavigate} from "react-router-dom";*/
import QRCode from "react-qr-code";
import html2canvas from "html2canvas"
export default function UserCard({user}){
  const state = useSelector(state => state);
  const handleDownloadImage = async () => {
    const element = document.getElementById('userCard');
    var canvas = await html2canvas(element,{useCORS: true});
    var data = canvas.toDataURL('image/jpg');
    var link = document.createElement('a');
 
    link.href = data;
    link.download = user.userId+'.jpg';
 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div onClick={()=>{handleDownloadImage()}} id="userCard" className="user-card">
     { (user.loaded && user.name && !user.error) ? <> <div><div>
       <img className="profile" src={user.picture ? user.picture : "/profile.png"} alt="Profile"/>
       </div>
       <div className="details">
        <span className="name">{user.name ? user.name : "Loading Details..."}</span>
        <span className="email">{(state.is_logged && state.user) && state.user.email}</span>
        <span className="userId">ID :{(state.is_logged && state.user) && state.user.userId}</span>
      </div></div><div>
      <span className="reg-events"><span><h4 className="underlined">Registered Events</h4><b> {user.participate.map(event=><span>{event.name},</span>)}</b> </span></span>
      <div className="qrcode"><QRCode title="vijnana" value={user.userId} bgColor="#00000000" fgColor="var(--text)" size="80"/></div></div>
      </> : <div className="error">Not logged in</div> }
    </div>
  );
}