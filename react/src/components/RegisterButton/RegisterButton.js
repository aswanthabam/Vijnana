import "./RegisterButton.css";
import {registerEvent} from "../../services/EventServices";
import {useLogin,useNotification} from "../../helper"
export default function RegisterButton({id}){
  const [user] = useLogin();
  const showNotification = useNotification();
  return (
    <div onClick={()=>{
      registerEvent(id,user.userId).then(res=>{
        if(res.data.status == 200){
          showNotification(res.data.description,"success");
        }else {
          showNotification(res.data.description,"error");
        }
      }).catch(err=>{
        showNotification("Error registering","error");
      });
    }} className="register-button">
      Register
    </div>
  );
}