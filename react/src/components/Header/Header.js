import './Header.css';
import logo from '../../images/logo.png';
import bg from "../../images/bg2.jpg"
//import TopBar from '../TopBar/TopBar'
import vid from "../../videos/vid1.mp4"
import name from "../../images/name.png"
import {useEffect} from "react"
export default function Header(){
  useEffect(()=>{
    var e = document.createElement("link");
    e.rel = "preload";
    e.as = "video";
    e.type = "video/mp4";
    e.href = vid;
    document.head.appendChild(e);
  },[]);
  return (
    <div className="header">
      <video onClick={(elem)=>{
        elem.currentTarget.style.animation = "none";
        document.getElementById("header-center-elem").style.animation = "none";
      }} className='videoTag' autoPlay muted preload="auto">
        <source src={vid} type='video/mp4' preload="auto" />
      </video>
      <img alt="" className="background" src={bg}/>
      <div id="header-center-elem" className="center">
        <img alt="Logo" className="logo" src={logo}/>
        <img alt="VIJÑĀNA" className="name" src={name}/>
        <h2 className="heading">VIJÑĀNA</h2>
      </div>
      <div className="bottom">
        <h3 className="college">
          Govt. College Thalassery<br/>
          Dept. of Computer Science
        </h3>
      </div>
      <div className="go-bottom">
        <a href="#main"><i class="bi bi-chevron-down"></i></a>
      </div>
    </div>
  );
}