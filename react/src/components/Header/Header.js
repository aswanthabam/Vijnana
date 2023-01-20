import './Header.css';
import logo from '../../images/logo.png';
import bg from "../../images/bg2.jpg"
import TopBar from '../TopBar/TopBar'
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
   // <link rel="preload" as="video" type="video/mp4" href="foo.mp4" />
  },[]);
  return (
    <div className="header">
      <TopBar/>
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
        {/*<h3 className="countdown">3 Days 2 Hours 35 Minutes</h3>
        <span className="countdown-bottom">Left for moving on...<br/><span id="res">Nothing</span></span>*/}
      </div>
      <div className="bottom">
        <h3 className="college">
          Dept. of Computer Science<br/>
          Govt. College Thalassery
        </h3>
      </div>
      <div className="go-bottom">
        <a href="#main"><i class="bi bi-chevron-down"></i></a>
      </div>
    </div>
  );
}