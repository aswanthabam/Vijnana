import "../LoginButton/LoginButton.css";
import {useLogin} from "../../helper"
import {useNavigate} from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux';
import { logoutUser } from '../../actions/index'; 
export default function LogoutButton(){
  const state = useSelector(state => state);
  const [user,login,logout] = useLogin();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return <div className="user">
        <span onClick={()=>{
          logout();
          dispatch (logoutUser());
          navigate("/");
        }} className="button">Logout</span>
      </div>;
}