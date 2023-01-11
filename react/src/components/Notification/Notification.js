import "./Notification.css";
import {useSelector} from "react-redux";
export default function Notification({}){
  const notification = useSelector(state => state.notification);
  var icon;
  var classes = "notification "+notification.type;
  switch(notification.type){
    case "info":
       icon = "bi bi-info"
       break;
     default:icon = "bi bi-info"
  }
  if(notification.visible) classes += " visible";
  
  return (
    <div className={classes}>
      <span className="icon">
        <i className={icon}></i>
      </span>
      <span className="text">
         {notification.text}
      </span>
      <span className="close">
        <i className="bi bi-x"></i>
      </span>
    </div>
  );
}