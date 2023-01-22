import { useCookies } from 'react-cookie';
import { useEffect,useState } from 'react';
import {useDispatch,useSelector} from "react-redux";
import {newNotification,cancelNotification,setTopBarLogin,setSidebar} from "./actions/index"

export const useSidebar = () =>{
  const sidebar = useSelector(state => state.sidebar);
  const dispatch = useDispatch();
  const open = () =>{
    dispatch(setSidebar(true));
  }
  const close = () =>{
    dispatch(setSidebar(false));
  }
  return [sidebar,open,close];
}
export const useTopBar = () =>{
  const dispatch = useDispatch();
  const hideLogin = () =>{
    dispatch(setTopBarLogin(false));
  }
  const showLogin = () =>{
    dispatch(setTopBarLogin(true));
  }
  return [hideLogin,showLogin]
}
export const useNotification = () =>{
  // const notification = useDispatch(state => state.notification);
  const dispatch = useDispatch();
  /*const [visible,setVisible] = useState(false);
  const [text,setText] = useState(null);
  const [type,setType] = useState("info");*/
  
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
 // const [token,setToken] = useState(null);
 // const [expiry,setExpiry] = useState(null);
  const [cookies,setCookie] = useCookies("admin");
  
  const login = ({token,expiry=null}) =>{
    if(expiry == null){
      expiry = new Date();
      expiry.setDate(expiry.getDate() + 14);
    }else expiry = new Date(expiry);
    setCookie("token",token,{path:'/',expires:expiry});
   // setCookie("expiry",token,{path:'/',expires:date});
    // setToken(token);
  }
  const logout = () =>{
    setCookie("token",null,{path:'/'});
   // setCookie("expiry",token,{path:'/',expires:date});
  //  setToken(null);
  }/*
  useEffect(()=>{
    setToken(cookies.token);
  },[cookies]);*/
  return [cookies.token, login,logout];
}
export const useLogin = () => {
  const [user,setUser] = useState({is_logged:false});
  const [cookies,setCookie] = useCookies("user");
  //const {userId,email,token,expiry=null} = user;
  const login = ({userId,email,token,expiry=null}) =>{
    if(expiry == null){
      expiry = new Date();
      expiry.setDate(expiry.getDate() + 14);
    }else expiry = new Date(expiry);
    setCookie("is_logged",true,{path:"/",expires:expiry});
    setCookie("userId",userId,{path:"/",expires:expiry});
    setCookie("email",email,{path:"/",expires:expiry});
    setCookie("token",token,{path:"/",expires:expiry});
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