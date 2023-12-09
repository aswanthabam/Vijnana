import { Link, useNavigate } from "react-router-dom";
import LoginButton from "../buttons/LoginButton/LoginButton";
import style from "./topbar.module.css";
import logo from "../../assets/logo.png";
import React from "react";
interface TopBarProps {
  theme: string;
  setTheme: (theme: string) => void;
  setSidebarState: (state: boolean) => void;
  sidebarState: boolean;
  className?: string;
}

const TopBar: React.FC<TopBarProps> = ({
  setTheme,
  theme,
  setSidebarState,
  sidebarState,
  className,
}) => {
  const [text, setText] = React.useState<string>("Register");
  const [link, setLink] = React.useState<string>("");
  const [iconVisible, setIconVisible] = React.useState<boolean>(true);
  const redirect = useNavigate();

  const handleLoginClick = () => {
    redirect(link);
  };
  React.useEffect(() => {
    var step = localStorage.getItem("step") as any as number;
    if (step)
      if (step == 1) {
        setText("Continue Registration");
        setLink("/register/details");
        setIconVisible(false);
        return;
      } else if (step == 2) {
        setText("Dashboard");
        setLink("/dashboard");
        setIconVisible(false);
        return;
      }
    setText("Register");
    setLink("/register");
    setIconVisible(true);
  });
  return (
    <>
      <div className={style.topbar + " " + style.mobile + " " + className}>
        <div
          onClick={() => {
            setSidebarState(!sidebarState);
          }}
          className={style.menuButton}
        >
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
          <LoginButton
            onClick={handleLoginClick}
            text={text}
            iconVisible={iconVisible}
          />
        </div>
      </div>

      <div className={style.topbar + " " + style.desktop + " " + className}>
        <div className={style.menuItems}>
          <div className={style.menuButton}>
            <img className={style.logo} src={logo} />
          </div>
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
          <LoginButton
            onClick={handleLoginClick}
            text={text}
            iconVisible={iconVisible}
          />
        </div>
      </div>
    </>
  );
};

export default TopBar;
