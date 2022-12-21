import './Header.css';
import bg from '../../images/bg_1.jpg';
export default function Header(){
  return (
    <div className="header">
      <img className="background" src={bg}/>
      <div className="center">
        <h2 className="heading">VIDHYA</h2>
        <h3 className="countdown">3 Days 2 Hours</h3>
      </div>
      <div className="bottom">
        <h3 className="college">
          Dept. of Computer Science<br/>
          Govt. College Thalassery
        </h3>
      </div>
      <div className="go-bottom">
        <i class="bi bi-chevron-down"></i>
      </div>
    </div>
  );
}