import style from "./Sidebar.module.css";
import { _Event } from "../../utils/types";

interface SidebarProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ state, setState }) => {
  return (
    <>
      <div className={style.sidebar + " " + (state && style.show)}></div>
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
