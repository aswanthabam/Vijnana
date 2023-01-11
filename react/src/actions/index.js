import {USER_LOGIN,USER_LOGOUT,NEW_NOTIFICATION,CANCEL_NOTIFICATION,GOOGLE_SCRIPT_LOADED,SET_ADMIN} from "./types";

export const setAdmin = (is_admin=true,token)=>({
  type:SET_ADMIN,
  payload:{
    token:token,
    is_admin:is_admin
  }
});

export const googleScriptLoaded = (val=false) => ({
  type: GOOGLE_SCRIPT_LOADED,
   payload: {
      gapi:val
   }
});

export const cancelNotification = () => ({
  type: CANCEL_NOTIFICATION,
   payload: {
      visble:false
   }
});
export const newNotification = (text,type="info",auto=true,time=4000) => ({
  type: NEW_NOTIFICATION,
   payload: {
      text:text,
      type:type,
      visble:true,
      auto:auto,
      time:time
   }
});
export const loginUser = ({user,is_logged=false}) => ({
  type: USER_LOGIN,
   payload: {
      user:user,
      is_logged:is_logged
   }
});

export const logoutUser = () => (
  {
    type:USER_LOGOUT,
    payload:{
    }
  }
);