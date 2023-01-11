import { useCookies } from 'react-cookie';
import { useEffect,useState } from 'react';
import {useDispatch} from "react-redux";
import {newNotification,cancelNotification} from "./actions/index"
export const useNotification = () =>{
  const notification = useDispatch(state => state.notification);
  const dispatch = useDispatch();
  const [visible,setVisible] = useState(false);
  const [text,setText] = useState(null);
  const [type,setType] = useState("info");
  
  const showNotification = (te,ty="info",au=true,time=4000) => {
    dispatch(newNotification(te,ty,au,time));
    /*setText(te);
    setType(ty);
    setVisible(true);*/
    if(au)setTimeout(()=>{dispatch(cancelNotification())},time);
  }
  
  return showNotification;
};
export const useAdmin = () =>{
  const [token,setToken] = useState(null);
  const [expiry,setExpiry] = useState(null);
  const [cookies,setCookie] = useCookies("admin");
  
  const login = ({token,expiry=null}) =>{
    if(expiry == null){
      expiry = new Date();
      expiry.setDate(expiry.getDate() + 14);
    }
    setCookie("token",token,{path:'/',expiry:expiry});
   // setCookie("expiry",token,{path:'/',expiry:date});
    setToken(token);
  }
  const logout = () =>{
    setCookie("token",null,{path:'/'});
   // setCookie("expiry",token,{path:'/',expiry:date});
    setToken(null);
  }
  useEffect(()=>{
    setToken(cookies.token);
  },[cookies]);
  return [token, login,logout];
}
export const useLogin = () => {
  const [user,setUser] = useState({is_logged:false});
  const [cookies,setCookie] = useCookies("user");
  //const {userId,email,token,expiry=null} = user;
  const login = ({userId,email,token,expiry=null}) =>{
    if(expiry == null){
      expiry = new Date();
      expiry.setDate(expiry.getDate() + 14);
    }
    setCookie("is_logged",true,{path:"/",expiry:expiry});
    setCookie("userId",userId,{path:"/",expiry:expiry});
    setCookie("email",email,{path:"/",expiry:expiry});
    setCookie("token",token,{path:"/",expiry:expiry});
    setUser({
      "is_logged":true,
      "userId":userId,
      "email":email,
      token:token
    });
  };
  const logout = () =>{
    setCookie("is_logged",false,{path:"/"});
    setCookie("userId",null,{path:"/"});
    setCookie("email",null,{path:"/"});
    setCookie("token",null,{path:"/"});
    setUser({
      "is_logged":false
    });
  };
  useEffect(()=>{
    setUser({
      "is_logged":(cookies.is_logged === "true" ? true : false)||false,
      "userId":cookies.userId,
      "email":cookies.email,
      token:cookies.token
    });
  },[cookies]);
  return [user,login,logout]; 
};