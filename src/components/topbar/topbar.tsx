import { Link } from "react-router-dom";
import LoginButton from "../buttons/LoginButton/LoginButton";
import style from "./topbar.module.css";

interface TopBarProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const TopBar: React.FC<TopBarProps> = ({ setTheme, theme }) => {
  return (
    <>
      <div className={style.topbar + " " + style.mobile}>
        <div className={style.menuButton}>
          <i className="bi bi-list"></i>
        </div>
        <div className={style.loginButton}>
          <span
            className={style.themeButton}
            onClick={() => {
              if (theme == "light") setTheme("dark");
              else setTheme("light");
            }}
          >
            {theme == "light" ? (
              <i className="bi bi-brightness-high-fill"></i>
            ) : (
              <i className="bi bi-sun"></i>
            )}
          </span>
          <LoginButton />
        </div>
      </div>

      <div className={style.topbar + " " + style.desktop}>
        <div className={style.menuItems}>
          <div className={style.menuButton}>
            <Link to="/">Home</Link>
          </div>
          <div className={style.menuButton}>
            <Link to="/events">Events</Link>
          </div>
          <div className={style.menuButton}>
            <Link to="/about">About</Link>
          </div>
          <div className={style.menuButton}>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className={style.loginButton}>
          <span
            className={style.themeButton}
            onClick={() => {
              if (theme == "light") setTheme("dark");
              else setTheme("light");
            }}
          >
            {theme == "light" ? (
              <i className="bi bi-brightness-high-fill"></i>
            ) : (
              <i className="bi bi-sun"></i>
            )}
          </span>
          <LoginButton />
        </div>
      </div>
    </>
  );
};

export default TopBar;
