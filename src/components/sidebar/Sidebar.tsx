import style from "./Sidebar.module.css";
import { _Event } from "../../utils/types";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ state, setState }) => {
  const location = useLocation();
  return (
    <>
      <div className={style.sidebar + " " + (state && style.show)}>
        <div className={style.header}>
          <div className={style.close}>
            <i
              onClick={() => {
                setState(false);
              }}
              className="bi bi-x-lg"
            ></i>
          </div>
          <div className={style.logo}>
            <img src="/logo.png" alt="logo" />
          </div>
        </div>
        <div className={style.content}>
          <div
            className={
              style.item + " " + (location.pathname == "/" && style.current)
            }
            onClick={() => {
              setState(false);
            }}
          >
            <i className="bi bi-house"></i>
            <Link to={"/"}>Home</Link>
          </div>
          <div
            className={
              style.item +
              " " +
              (location.pathname == "/events" && style.current)
            }
            onClick={() => {
              setState(false);
            }}
          >
            <i className="bi bi-calendar-heart"></i>
            <Link to={"/events"}>Events</Link>
          </div>
          <div
            className={
              style.item +
              " " +
              (location.pathname == "/about" && style.current)
            }
            onClick={() => {
              setState(false);
            }}
          >
            <i className="bi bi-info-circle"></i>
            <Link to={"/about"}>About</Link>
          </div>
          <div
            className={
              style.item +
              " " +
              (location.pathname == "/contact" && style.current)
            }
            onClick={() => {
              setState(false);
            }}
          >
            <i className="bi bi-person-lines-fill"></i>
            <Link to={"/contact"}>Contact</Link>
          </div>
        </div>
        <div className={style.footer}>
          <a href="https://github.com/aswanthabam">
            <i className="bi bi-c-circle"></i>
            <span> 2023</span>
          </a>
        </div>
      </div>
      <div
        onClick={() => {
          setState(false);
        }}
        className={style.overlay + " " + (state && style.show)}
      ></div>
    </>
  );
};

export default Sidebar;
