import "./Login.css";
import {useState} from "react";
import {adminLogin} from "../../../services/AdminService";
import {useAdmin} from "../../../helper"
import {useNotification} from "../../../helper"
import {useNavigate} from "react-router-dom";

export default function Login(){
  const [user,setUser] = useState(null);
  const [pass,setPass] = useState(null);
  const redirect = useNavigate();
  const [token,login,logout] = useAdmin();
  const showNotification = useNotification();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await adminLogin(user,pass).then(res=>{
      
      if(res.data.status == 200){
        login(res.data.content);
        //localStorage.setItem("adminToken",res.data.content.token);
       // showNotification(JSON.stringify(res.data.error));
       showNotification(res.data.description,"success");
       redirect("/admin");
      }else{
        logout();
        //localStorage.setItem("adminToken",null);
        //showNotification(JSON.stringify(res.data.error));
        showNotification(res.data.description,"error");
      }
    }).catch(err=>{
      console.log("Error")
      console.log(err);
      logout();
      //localStorage.setItem("adminToken",null);
      showNotification("Error loging in..","error");
      //showNotification(JSON.stringify(err),"info",false);
    });
  };
  return (
    <div className="login">
      <input onChange={(e)=>{setUser(e.target.value)}} type="text" placeholder="User Name"/>
      <input onChange={(e)=>{setPass(e.target.value)}} type="text" placeholder="Password"/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}