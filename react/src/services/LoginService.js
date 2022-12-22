import axios from "axios";

export const fromAccessToken = token =>{
  return axios.get("https://oauth2.googleapis.com/tokeninfo?access_token="+token);
};