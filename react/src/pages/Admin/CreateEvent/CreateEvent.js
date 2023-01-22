import "./CreateEvent.css";
import Form1 from "../../../components/Form1/Form1"
import {useState,useEffect} from "react";
import {useNotification,useAdmin} from "../../../helper";
import {createEvent,getEvent,editEvent} from "../../../services/EventServices"
import {useParams} from "react-router-dom";
export default function CreateEvent({edit=false}){
  const [event,setEvent] = useState({});
  const [loaded,setLoaded] = useState(false);
  const {id=null} = useParams();
  const [token,login,logout] = useAdmin();
  useEffect(()=>{
    if(edit){
      getEvent(id,token).then(res=>{
        setLoaded(true);
        if(res.data.status == 200) {
          setEvent(res.data.content);
        }else {
          showNotification(res.data.description,"warning");
        }
      }).catch(err=>{
        setLoaded(true);
        showNotification("Error geting event data ,","error");
      });
    }
    else setLoaded(true);
  },[]);
  const showNotification = useNotification();
  const handleSubmit = () =>{
    if(edit){
      editEvent(event).then(res=>{
        if(res.data.status == 200){
          showNotification(res.data.description,"success");
        }else{
          showNotification(res.data.description,"warning");
        }
      }).catch(err=>{
        showNotification("An error occured!"+err,"error");
      });
    }else {
      createEvent(event).then(res=>{
        if(res.data.status == 200){
          showNotification(res.data.description,"success");
        }else{
          showNotification(res.data.description,"warning");
        }
      }).catch(err=>{
        showNotification("An error occured!"+err,"error");
      });
    }
  }
  return (
    <div className="create-event-form">
    <Form1 onSubmit={handleSubmit}>
      <h3 className="underlined">Create Event</h3>
      <div className="item">
        <input value={edit?event.name:null} onChange={(e)=>{
          setEvent({...event,name:e.target.value});
        }} type="text" placeholder=" " required></input>
        <label>Event Name *</label>
      </div>
      <div className="item">
        <textarea value={edit?event.description:null} placeholder=" " onChange={(e)=>{
          setEvent({...event, description:e.target.value});
        }} required></textarea>
        <label>Event Description *</label>
      </div>
      <div className="item date">
        <input value={edit?event.date:null} className="input" onClick={(e)=>{e.currentTarget.parentElement.childNodes[1].click()}} onChange={(e)=>{
          setEvent({...event,date:new Date(e.target.value)});
        }} type="text" placeholder=" " required></input>
        <input className="date-input" onChange={(e)=>{
          setEvent({...event,date:new Date(e.target.value)});
          e.currentTarget.parentElement.firstChild.value = ""+new Date(e.currentTarget.value);
        }} type="datetime-local" placeholder=" "></input>
        <label>Event Date *</label>
      </div>
      <div className="item">
        <select value={edit?event.type:null} onChange={(e)=>{
          setEvent({...event,type:e.target.value});
        }} required >
          <option value="" selected="true" disabled="true" hidden="true" >Select *</option>
          <option value="competition">Competition</option>
          <option value="class">Class / Seminar</option>
          <option value="ceremony">Ceremony</option>
        </select>
        <label>Event Type *</label>
      </div>
      
      <div className="item">
        <input value={edit?event.image:null} onChange={(e)=>{
          setEvent({...event, image:e.target.value});
        }} type="text" placeholder=" " required></input>
        <label>Image illustration (Url,Default)</label>
      </div>
      
      <div className="item">
        <input  value={edit?event.minPart:null} onChange={(e)=>{
          setEvent({...event,minPart:e.target.value});
        }} type="number" placeholder=" "></input>
        <label>Minimum Participants (optional)</label>
      </div>
      <div className="item">
        <input value={edit?event.maxPart:null} onChange={(e)=>{
          setEvent({...event,maxPart:e.target.value});
        }} type="number" placeholder=" "></input>
        <label>Maximum Participants (optional)</label>
      </div>
      
      <div className="item">
        <input  value={edit?event.poster:null} onChange={(e)=>{
          setEvent({...event,poster:e.target.value});
        }} type="text" placeholder=" "></input>
        <label>Event Poster (Url,Optional)</label>
      </div>
      
      <div className="item">
        <input value={edit?event.docs:null} onChange={(e)=>{
          setEvent({...event,docs:e.target.value});
        }} type="text" placeholder=" "></input>
        <label>Other Documents (Url,optional)</label>
      </div>
      
      
      <input type="submit" value={edit?"Save Event":"Create Event"}></input>
    </Form1>
    </div>
  );
}