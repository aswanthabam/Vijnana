import "./Event.css";
import {useState,useEffect} from "react";
import RegisterButton from "../../components/RegisterButton/RegisterButton"
import {useNotification} from "../../helper"
import {getEvent} from "../../services/EventServices";
import {useParams} from "react-router-dom";
import PreLoader from "../../components/PreLoader/PreLoader";
export default function Event(){
  const {id} = useParams();
  const [event,setEvent] = useState(null);
  const [loaded,setLoaded] = useState(false);
  useEffect(()=>{
    getEvent(id).then(res=>{
      setLoaded(true);
      if(res.data.status === 200) {
       // showNotification(res.data.description,"success");
        setEvent({...res.data.content,date:new Date(res.data.content.date).toLocaleString("en-us", {
            hour12: true,
            weekday: "short",
            hour: "numeric",
            month: "short",
            day:"numeric",
            minute:"numeric"
          })});
      }else {
        showNotification(res.data.description,"error");
      }
    }).catch(err =>{
      setLoaded(true);
      showNotification("Error fetching event data","error");
    });
    // eslint-disable-next-line
  },[]);
  //const [user] = useLogin();
  const showNotification = useNotification();
  return (
    <div className="event-page">
      <PreLoader visible={!loaded}/>
      { event ? <div>
      <p className="type"><span>{event.type}</span></p>
      <img className="image" src={event.image} alt={event.name} ></img>
      <h3 className="underlined name">{event.name}</h3>
      <p className="date"><span>{event.date}</span></p>
      <p className="description">
        {event.description}
      </p>
      <RegisterButton id={id}/>
      {event.poster && <><h4>Poster</h4><img src={event.poster} alt={"poster-"+event.name} className="poster"/></> }
      </div>: <span></span> }
    </div>
  );
}