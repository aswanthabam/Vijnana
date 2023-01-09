import axios from "axios";
import {api} from "../config";
export const getMyDetails = (userId,token) =>{
  return axios.post(api+"/api/user/getMyDetails",{
    userId:userId,
    token:token
  });
};