import {USER_LOGIN,USER_LOGOUT,NEW_NOTIFICATION,CANCEL_NOTIFICATION} from "../actions/types";
//import {useLogin,useLogout} from "../helper"
export default function userReducer(state = {is_logged:false}, action) {
  
   switch (action.type) {
      case USER_LOGIN:
         return {...state, ...action.payload};
      case USER_LOGOUT:
        return {is_logged:false};
      case NEW_NOTIFICATION:
        return {...state,notification:action.payload};
      case CANCEL_NOTIFICATION:
        return {...state,notification:action.payload};
      default:
         return state;
   }
}