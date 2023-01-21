import './Events.css';
import Event from '../Event/Event';
import {getAllEvents} from "../../services/EventServices";
import {useEffect,useState} from "react";
import {useNotification} from "../../helper";
export default function Events(props){
  const [events,setEvents] = useState([]);
  const showNotification = useNotification();
  useEffect(()=>{
    getAllEvents().then(res=>{
      if(res.data.status == 200){
        // showNotification(res.data.description,"success");
        setEvents(res.data.content);
      }else{
        showNotification(res.data.description,"error");
      }
    }).catch(err =>{
      showNotification("An error occured when fet hing events","error");
    });
  },[]);/*
  var events = [
    {
      id:19,
      name:"Inauguration",
      time:"10 Pm",
      date:"25th Aug",
      description:"Lest roll in to the mood..."
    },
    {
      id:19,
      name:"Exhibition",
      time:"10 Pm",
      date:"25th Aug",
      description:"Festive mood begins here.. Exhibition and shows of tech products and framework."
    }
  ];*/
  const {className = "",id = ""} = props;
  return (
    <div className={"events "+className} id={id}>
      <h3 className="underlined heading">Events</h3>
      {events.map(event => <Event event={{...event,date:new Date(event.date)}}/>)}
    </div>
  );
}