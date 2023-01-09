import {USER_LOGIN,USER_LOGOUT,NEW_NOTIFICATION,CANCEL_NOTIFICATION,GOOGLE_SCRIPT_LOADED} from "./types";

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
export const newNotification = ({text,type="info"}) => ({
  type: NEW_NOTIFICATION,
   payload: {
      text:text,
      type:type,
      visble:true
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