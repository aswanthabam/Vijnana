import './TopBar.css';
// import {Link} from 'react-router-dom';
import LoginButton from '../LoginButton/LoginButton'
import {useSidebar} from "../../helper"
import {useSelector} from "react-redux"
export default function TopBar()
{
  const topbar = useSelector(state => state.topbar);
  const [sidebar,open,close] = useSidebar();
  return (
    <div className="topbar">
      <div onClick={()=>{
        if(sidebar.visible) close();
        else open();
       }} className="menu">
         <i className="bi bi-list"></i>
      </div>
      { topbar.visible ? <LoginButton/> : ""}
    </div>
  );
}