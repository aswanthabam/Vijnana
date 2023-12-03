import "./RegisterButton.css";
import {useState,useEffect} from "react";
import {registerEvent} from "../../services/EventServices";
import {useLogin,useNotification} from "../../helper"
import { useNavigate } from "react-router-dom";
export default function RegisterButton({event}){
  const [reg,setReg] = useState(false);
  const [user] = useLogin();
  useEffect(()=>{
    if(event == null || user == null) return;
    for(var i = 0;i < event.participants.length;i++){
      if(event.participants[i].userId === user.userId){
        setReg(true);
      }
    }
    
  },[event,user]);
  const redirect = useNavigate();
  const showNotification = useNotification();
  return (
    <div onClick={()=>{
      if(!user.is_logged) redirect("/register");
      else if(!reg && event && event.is_reg) registerEvent(event.id,user.userId).then(res=>{
        if(res.data.status === 200){
          showNotification(res.data.description,"success");
          setReg(true);
        }else {
          showNotification(res.data.description,"error");
        }
      }).catch(err=>{
        showNotification("Error registering","error");
      });
    }} className={"register-button"+((reg || !event.is_reg)?" registered":"")}>
      {event.is_reg ? (reg?"Registered":"Register") : "OPEN TO ALL"}
    </div>
  );
}