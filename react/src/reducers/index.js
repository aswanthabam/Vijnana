import {USER_LOGIN,USER_LOGOUT,NEW_NOTIFICATION,CANCEL_NOTIFICATION,GOOGLE_SCRIPT_LOADED} from "../actions/types";
//import {useLogin,useLogout} from "../helper"
export default function userReducer(state = {is_logged:false,gapi:false}, action) {
  
   switch (action.type) {
      case USER_LOGIN:
         return {...state, ...action.payload};
      case USER_LOGOUT:
        return {...state,is_logged:false,user:{}};
      case NEW_NOTIFICATION:
        return {...state,notification:action.payload};
      case CANCEL_NOTIFICATION:
        return {...state,notification:action.payload};
      case GOOGLE_SCRIPT_LOADED:
        return {...state,gapi:action.payload.gapi};
      default:
         return state;
   }
}