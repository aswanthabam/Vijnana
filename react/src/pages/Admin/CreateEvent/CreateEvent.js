import "./CreateEvent.css";
import Form1 from "../../../components/Form1/Form1"
import {useState} from "react";
import {useNotification} from "../../../helper";
import {createEvent} from "../../../services/EventServices"
export default function CreateEvent(){
  const [event,setEvent] = useState({image:"https://pixabay.com/get/g886a67538ca70d757ff61e05baaebf220d8c6d133c1f0b2eb243b1af0ef37a81891a083b83a1e595847c8431c0f28e389c6aa0f8786d8feab5836d2770f98849_1280.jpg"});
  const showNotification = useNotification();
  const handleSubmit = () =>{
    createEvent(event).then(res=>{
      if(res.data.status == 200){
        showNotification(res.data.description,"success");
      }else{
        showNotification(res.data.description+JSON.stringify(res.data.error),"warning");
      }
    }).catch(err=>{
      showNotification("An error occured!"+err,"error");
    });
  }
  return (
    <div className="create-event-form">
    <Form1 onSubmit={handleSubmit}>
      <h3 className="underlined">Create Event</h3>
      <div className="item">
        <input onChange={(e)=>{
          setEvent({...event,name:e.target.value});
        }} type="text" placeholder=" " required></input>
        <label>Event Name *</label>
      </div>
      <div className="item">
        <textarea placeholder=" " onChange={(e)=>{
          setEvent({...event, description:e.target.value});
        }} required></textarea>
        <label>Event Description *</label>
      </div>
      <div className="item date">
        <input className="input" onClick={(e)=>{e.currentTarget.parentElement.childNodes[1].click()}} onChange={(e)=>{
          setEvent({...event,date:new Date(e.target.value)});
        }} type="text" placeholder=" " required></input>
        <input className="date-input" onChange={(e)=>{
          setEvent({...event,date:new Date(e.target.value)});
          e.currentTarget.parentElement.firstChild.value = ""+new Date(e.currentTarget.value);
        }} type="datetime-local" placeholder=" "></input>
        <label>Event Date *</label>
      </div>
      <div className="item">
        <select onChange={(e)=>{
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
        <input onChange={(e)=>{
          setEvent({...event, image:e.target.value});
        }} type="text" value="https://pixabay.com/get/g886a67538ca70d757ff61e05baaebf220d8c6d133c1f0b2eb243b1af0ef37a81891a083b83a1e595847c8431c0f28e389c6aa0f8786d8feab5836d2770f98849_1280.jpg" placeholder=" "></input>
        <label>Image illustration (Url,Default)</label>
      </div>
      
      <div className="item">
        <input onChange={(e)=>{
          setEvent({...event,minPart:e.target.value});
        }} type="number" placeholder=" "></input>
        <label>Minimum Participants (optional)</label>
      </div>
      <div className="item">
        <input onChange={(e)=>{
          setEvent({...event,maxPart:e.target.value});
        }} type="number" placeholder=" "></input>
        <label>Maximum Participants (optional)</label>
      </div>
      
      <div className="item">
        <input onChange={(e)=>{
          setEvent({...event,poster:e.target.value});
        }} type="text" placeholder=" "></input>
        <label>Event Poster (Url,Optional)</label>
      </div>
      
      <div className="item">
        <input onChange={(e)=>{
          setEvent({...event,docs:e.target.value});
        }} type="text" placeholder=" "></input>
        <label>Other Documents (Url,optional)</label>
      </div>
      
      
      <input type="submit" value="Create Event"></input>
    </Form1>
    </div>
  );
}