import "./SideBar.css";
// import {setSidebar} from "../../actions/index";
//import {useSelector,useDispatch} from "react-redux";
import {useSidebar} from "../../helper"
import {Link,useLocation} from "react-router-dom";
export default function SideBar() {
  const [sidebar,,close] = useSidebar();
  const location = useLocation();
  const data = [
    {
      location:"/",
      icon:"bi bi-house",
      name:"Home",
      current:location.pathname==="/"
    },
    {
      location:"/dashboard",
      icon:"bi bi-cpu",
      name:"Dashboard",
      current:location.pathname==="/dashboard"
    },
    {
      location:"/events",
      icon:"bi bi-calendar2-event",
      name:"Events",
      current:location.pathname==="/events"
    },
    {
      location:"/register",
      icon:"bi bi-person-plus",
      name:"Register",
      current:location.pathname==="/register"
    },
  ];
  return (
    <div className={"sidebar "+(sidebar.visible?"show":"hide")} >
      <div className="header">
        <div className="title">
          Menu
        </div>
        <div onClick={()=>{close();}} className="close">
          <i class="bi bi-x"></i>
        </div>
      </div>
      <div className="body">
         {data.map(item => <div className="item">
           <Link className={item.current ? "current":""} to={item.location}><i class={item.icon}></i> {item.name}</Link>
         </div>)}
      </div>
    </div>
  );
}