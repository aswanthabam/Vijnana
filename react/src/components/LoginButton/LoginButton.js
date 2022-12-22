import React,{useState} from "react";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
 import {fromAccessToken} from '../../services/LoginService';
import { useGoogleLogin } from '@react-oauth/google';


const LoginButton = () => {
  const [mi,setMi] = useState(true);
  const onLogin = (token) =>{
    fromAccessToken(token.access_token).then(res =>{
      if(res.status==200){
        document.getElementById("res").textContent = res.data.access_type+"|"+ Object.keys(res.data);
      }else{}
    }).catch(err =>{
      document.getElementById("res").textContent = ""+ Object.keys(err);
    });
  };
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) =>{ onLogin(tokenResponse)},
  });
  return <div className="user" onClick={login}>
        {mi ? <span id="res"><i class="bi bi-google"></i> Register</span> : <span>None</span>}
      </div>;
};

export default LoginButton;