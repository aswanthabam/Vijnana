import './Event.css';
import {Link} from "react-router-dom"
import {useNotification,useAdmin} from "../../helper";
import {deleteEvent} from "../../services/EventServices";
export default function Event({event,...props})
{
  const showNotification = useNotification();
  const [token] = useAdmin();
  var date = event.date.toLocaleString("en-us", {
    hour12: true,
    weekday: "short",
    hour: "numeric",
    month: "short",
    day:"numeric",
    minute:"numeric"
  });
  return (
    <div className="admin-event">
      <h3 className="heading">{event.name}</h3>
      <p className="type"><span>{event.type}</span></p>
      <p className="date"><span>{ ""+date}</span></p>
      <p className="participants"><Link to={"/admin/participants/"+event.id}><span>{event.participants.length + " students registered"}</span></Link></p>
      <div className="options">
        <button onClick={()=>{deleteEvent(event.id,token).then(res=>{
          if(res.data.status == 200) {
            showNotification(res.data.description,"success");
          }else {
            showNotification(res.data.description,"error");
          }
        }).catch(err=>{
          showNotification("Error deleting","error");
        })}}>Delete</button>
        <Link to={"/admin/edit-event/"+event.id}>Edit</Link>
        
      </div>
    </div>
  );
}