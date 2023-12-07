import { useNavigate } from "react-router-dom";
import style from "./launch.module.css";
import { useEffect, useState } from "react";

interface EventsProps {}

const Launch: React.FC<EventsProps> = ({}) => {
  const [count, setCount] = useState(3);
  const redirect = useNavigate();

  setInterval(async () => {
    if (count >= 1) await setCount(count - 1);
    else redirect("/");
  }, 1000);
  return (
    <div className={style.launch}>
      <div id="countDown" className={style.countDown}>
        {count}
      </div>
    </div>
  );
};

export default Launch;
