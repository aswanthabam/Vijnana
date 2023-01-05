import {USER_LOGIN,USER_LOGOUT,NEW_NOTIFICATION,CANCEL_NOTIFICATION} from "./types";

export const cancelNotification = () => ({
  type: USER_LOGIN,
   payload: {
      visble:false
   }
});
export const newNotification = ({text,type="info"}) => ({
  type: USER_LOGIN,
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