import axios from "axios";
import {api} from "../config";
export const fromAccessToken = token =>{
  return axios.get("https://oauth2.googleapis.com/tokeninfo?access_token="+token);
};
export const login = (email,aud) =>{
  return axios.post(api+"/api/user/login",{
    email:email,
    aud:aud
  });
};
export const createUser = (email,name,picture,phone,dob,course,aud) =>{
  return axios.post(api+"/api/user/create",{
    email:email,
    name:name,
    picture:picture,
    phone:phone,
    dob:dob,
    course:course,
    aud:aud
  });
};