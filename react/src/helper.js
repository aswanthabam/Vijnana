import { useCookies } from 'react-cookie';
import { useEffect,useState } from 'react';

export const useNotification = () =>{
  const [visible,setVisible] = useState(false);
  const [text,setText] = useState(null);
  const [type,setType] = useState("info");
  
  const newNotification = (te,ty) => {
    setText(te);
    setType(ty);
    setVisible(true);
    setTimeout(()=>{setVisible(false)},2000);
  }
  
  return [visible,text,type,newNotification];
};
export const useLogin = () => {
  const [user,setUser] = useState({is_logged:false});
  const [cookies,setCookie,removeCookie] = useCookies("user");
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
      "is_logged":(cookies.is_logged == "true" ? true : false)||false,
      "userId":cookies.userId,
      "email":cookies.email,
      token:cookies.token
    });
  },[cookies]);
  return [user,login,logout]; 
};