import axios from "axios";
import {api} from "../config";

export const isAdmin = (token) =>{
  return axios.post(api+"/api/admin/is_admin",{
    token:token
  });
};
export const adminLogin = (user,pass) =>{
  return axios.post(api+"/api/admin/login",{
    user:user,
    pass:pass
  });
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