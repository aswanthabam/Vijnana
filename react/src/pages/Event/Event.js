import "./Event.css";
import {useState,useEffect} from "react";
import RegisterButton from "../../components/RegisterButton/RegisterButton"
import {useLogin,useNotification} from "../../helper"
import {getEvent} from "../../services/EventServices";
import {useParams} from "react-router-dom";
export default function Event({}){
  const {id} = useParams();
  const [event,setEvent] = useState(null);
  useEffect(()=>{
    getEvent(id).then(res=>{
      if(res.data.status == 200) {
       // showNotification(res.data.description,"success");
        setEvent(res.data.content);
      }else {
        showNotification(res.data.description,"error");
      }
    }).catch(err =>{
      showNotification("Error fetching event data","error");
    });
  },[]);
  const [user] = useLogin();
  const showNotification = useNotification();
  return (
    <div className="event-page">
      { event ? <div>
      <p className="type"><span>{event.type}</span></p>
      <img className="image" src={event.image} alt={event.name}></img>
      <h3 className="underlined name">{event.name}</h3>
      <p className="date"><span>{event.date}</span></p>
      <p className="description">
        {event.description}
      </p>
      <RegisterButton id={id}/> </div>: <span>Loading...</span> }
    </div>
  );
}