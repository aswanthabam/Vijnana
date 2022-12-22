import './TopBar.css';
import {Link} from 'react-router-dom';
import LoginButton from '../LoginButton/LoginButton'
export default function TopBar()
{
  return (
    <div className="topbar">
      <div className="menu">
         <i className="bi bi-list"></i>
      </div>
      <LoginButton/>
    </div>
  );
}