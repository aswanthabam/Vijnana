import axios from "axios";
import {api} from "../config";
export const editEvent = ({id=null,name=null, description=null,date=null,type=null,image=null,minPart=null,maxPart=null,poster=null,docs=null}) =>{
  return axios.post(api+"/api/event/edit",{
    id:id,
    name:name,
    description:description,
    date:date,
    type:type,
    image:image,
    minPart:minPart != null ? minPart : 1,
    maxPart:maxPart != null ? maxPart : 1,
    poster:poster,
    docs:docs
  });
};
export const createEvent = ({name=null, description=null,date=null,type=null,image=null,minPart=null,maxPart=null,poster=null,docs=null}) =>{
  return axios.post(api+"/api/event/create",{
    name:name,
    description:description,
    date:date,
    type:type,
    image:image,
    minPart:minPart != null ? minPart : 1,
    maxPart:maxPart != null ? maxPart : 1,
    poster:poster,
    docs:docs
  });
};

export const getAllEvents = (token=null,count=-1)=>{
  return axios.get(api+"/api/event/getAll?count="+count+(token != null ? "&token="+token:""));
};
export const getEvent = (id,token=null)=>{
  return axios.get(api+"/api/event/get?id="+id+(token != null ? "&token="+token:""));
};
export const deleteEvent = (id=null,token=null)=>{
  return axios.post(api+"/api/event/delete",{
    id:id,
    token:token
  });
};
export const registerEvent = (id=null,userId=null)=>{
  return axios.post(api+"/api/event/register",{
    id:id,
    userId:userId
  });
};