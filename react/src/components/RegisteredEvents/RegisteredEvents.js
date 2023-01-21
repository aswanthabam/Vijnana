import "./RegisteredEvents.css";
import {useLogin} from "../../helper";
import {useEffect,useState} from "react";
import {getDetails} from "../../services/UserService";
import {useNotification} from "../../helper"
export default function RegisteredEvents(){
  const [user] = useLogin();
  const [details,setDetails] = useState({loaded:false});
  const showNotification = useNotification();
 /* useEffect(()=>{
    getDetails(user.userId).then(res=>{
      if(res.data.status == 200) {
        setDetails({...res.data.content,loaded:true});
      }else {
        setDetails({loaded:true});
        showNotification(res.data.description,"error");
      }
    }).catch(err=>{
      setDetails({loaded:true});
      showNotification("An error occured","error");
    });
  },[user]);*/
  return (
    <div className="registered-events">
      
    </div>
  );
}