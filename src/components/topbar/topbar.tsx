import './topbar.css';
import IconButton from "../buttons/IconButton/IconButton";

function TopBar() {
  return <div className="topbar">
    <div className="mobile">
      <div className="menu-button">
        <IconButton text={null} icon='bx- bx-menu' type='transparent'/>
        <i className="bx bx-menu"></i>
      </div>
      <div className="account">
        <IconButton text={'Login'} icon="bx bx-open-door" type="primary"/>
      </div>
    </div>

    <div className="desktop">
      <div className="menu-button">
        <IconButton text={null} icon='bx- bx-menu' type='transparent'/>
        <i className="bx bx-menu"></i>
      </div>
      <div className="account">
        <IconButton text={'Login'} icon="bx bx-open-door" type="primary"/>
      </div>
    </div>
  </div>
}

export default TopBar;