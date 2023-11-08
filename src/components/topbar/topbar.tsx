import LoginButton from '../buttons/LoginButton/LoginButton';
import style from './topbar.module.css';

function TopBar() {
  return <>
    <div className={style.topbar + ' ' + style.mobile}>
      <div className={style.menuButton}>

      </div>
      <div className={style.account}>
        <LoginButton/>
      </div>
    </div>

    <div className={style.topbar + ' ' + style.desktop}>
      <div className={style.menuItems}>
        <div className={style.menuButton}>
          <span>Home</span>
        </div>
        <div className={style.menuButton}>
          <span>Events</span>
        </div>
        <div className={style.menuButton}>
          <span>About</span>
        </div>
        <div className={style.menuButton}>
          <span>Contact</span>
        </div>
      </div>
      <div className={style.loginButton}>
        <LoginButton/>
      </div>
    </div>
  </>
}

export default TopBar;