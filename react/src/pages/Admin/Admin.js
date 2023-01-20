import "./Admin.css";
import {Link} from "react-router-dom";
import Event from "../../components/AdminEvent/Event";
import {useState,useEffect} from "react";
import {useNotification} from "../../helper";
import {getAllEvents} from "../../services/EventServices";
import {useAdmin} from "../../helper";
export default function Admin(){
  const [events,setEvents] = useState([]);
  const showNotification = useNotification();
  const [token] = useAdmin();
  useEffect(()=>{
    getAllEvents(token).then(res=>{
      if(res.data.status == 200) {
        setEvents(res.data.content);
        showNotification(res.data.description,"success");
      }else {
        showNotification(res.data.description,"error");
      }
    }).catch(err=>{
      showNotification("Erroe fetching events","error");
    });
  },[]);
  return (
    <div className="admin">
      <h2 className="underlined">Admin Page</h2>
      <div className="quick-options">
        <Link to="/admin/create-event">Create a new event</Link>
        <Link to="/admin/view_event">View events</Link>
        <Link to="/admin/view_users">View users</Link>
      </div>
      <div className="events">
        {events.map(event=><Event event={{...event,date:new Date(event.date)}}/>)}
      </div>
    </div>
  )
}