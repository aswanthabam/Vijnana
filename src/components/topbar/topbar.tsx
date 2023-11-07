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
      <div className={style.menuButton}>
        <span>Vijnana</span>
      </div>
      <div className={style.account}>
        <span className={style.menuItem}>Home</span>
        <span className={style.menuItem}>Events</span>
        <span className={style.menuItem}>About</span>
        <span className={style.menuItem}>Contact</span>
        <LoginButton/>
      </div>
    </div>
  </>
}

export default TopBar;