import './Events.css';
import Event from '../Event/Event';
import PreLoader from '../PreLoader/PreLoader';
import {getAllEvents} from "../../services/EventServices";
import {useEffect,useState} from "react";
import {useNotification} from "../../helper";
export default function Events(props){
  const [events,setEvents] = useState([]);
  const [loaded,setLoaded] = useState(false);
  const showNotification = useNotification();
  useEffect(()=>{
    getAllEvents().then(res=>{
      setLoaded(true);
      if(res.data.status == 200){
        // showNotification(res.data.description,"success");
        setEvents(res.data.content);
      }else{
        showNotification(res.data.description,"error");
      }
    }).catch(err =>{
      setLoaded(true);
      showNotification("An error occured when fet hing events","error");
    });
  },[]);
  const {className = "",id = ""} = props;
  return (
    <div className={"events "+className} id={id}>
      <h3 className="underlined heading">Events</h3>
      <PreLoader visible={!loaded}/>
      <div className="container">
      {events.map(event => <Event event={{...event,date:new Date(event.date)}}/>)}
      </div>
    </div>
  );
}