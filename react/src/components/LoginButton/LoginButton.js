import './LoginButton.css'
import React,{useEffect} from "react";
//import jwt_decode from "jwt-decode";
// import {fromAccessToken} from '../../services/LoginService';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
const LoginButton = ({must=false}) => {
  const state = useSelector(state => state);
  useEffect(()=>{
    if(typeof window === "undefined" || !window.google) return;
    var parent = document.getElementById("login-button");
    
    if((!state.is_logged || must) && state.gapi) window.google.accounts.id.renderButton(parent,{theme:null});
  },[state.gapi,state.is_logged,must]);
  return <div className="user">
        {(!state.is_logged || must) &&<span className="g_id_signin" id="login-button">Login</span>}
        {(state.is_logged && !must)&&<Link to="/dashboard"><span className="button">Dashboard</span></Link>}
      </div>;
};

export default LoginButton;