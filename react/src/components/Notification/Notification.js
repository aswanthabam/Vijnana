import "./Notification.css";
import {useSelector,useDispatch} from "react-redux";
import {cancelNotification} from "../../actions/index";
export default function Notification({}){
  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();
  var icon;
  var classes = "notification "+notification.type;
  switch(notification.type){
    case "info":
       icon = "bi bi-info"
       break;
    case "warning":
       icon = "bi bi-exclamation-triangle";
       break;
    case "error":
      icon = "bi bi-emoji-dizzy";
      break;
    case "success":
      icon = "bi bi-emoji-smile";
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
      <span onClick={()=>{
        dispatch(cancelNotification());
      }} className="close">
        <i className="bi bi-x"></i>
      </span>
    </div>
  );
}