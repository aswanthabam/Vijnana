import "./Main.css"
import { useEffect } from 'react';
import Notification from "../Notification/Notification"
import TopBar from "../TopBar/TopBar";
import {useLocation} from "react-router-dom"
import {useSidebar} from "../../helper"
export default function Main({className,children})
{
  const location = useLocation();
  const [,,close] = useSidebar();
  useEffect(()=>{
    close();
    // eslint-disable-next-line
  },[location]);
  return (
    <div className={"main "+className}>
      <TopBar/>
      <Notification />
      <div className="content">
      { children }
      </div>
    </div>
  );
}