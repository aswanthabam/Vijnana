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