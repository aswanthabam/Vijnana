import './Header.css';
import bg from '../../images/bg_1.jpg';
import TopBar from '../TopBar/TopBar'
export default function Header(){
  return (
    <div className="header">
      <TopBar/>
      <img className="background" src={bg}/>
      <div className="center">
        <h2 className="heading">VIDHYA</h2>
        <h3 className="countdown">3 Days 2 Hours 35 Minutes</h3>
        <span className="countdown-bottom">Left for moving on...<br/><span id="res">Nothing</span></span>
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