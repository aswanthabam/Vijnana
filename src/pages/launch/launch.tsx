import { useNavigate } from "react-router-dom";
import style from "./launch.module.css";
import { useState } from "react";

interface EventsProps {}

const Launch: React.FC<EventsProps> = ({}) => {
  var [count, setCount] = useState(4);
  const redirect = useNavigate();

  const onPress = () => {
    count--;
    setCount(count);
    setInterval(async () => {
      count--;
      if (count == 1) {
        if (!(window as any).audio) {
          (window as any).audio = new Audio("/audio/launch.mp3");
          (window as any).audio.play();
        }
      }
      if (count >= 0) await setCount(count);
      else {
        redirect("/home");
      }
    }, 1000);
  };
  return (
    <div className={style.launch}>
      <div id="countDown" className={style.countDown}>
        {count != 4 && count}
      </div>
      {count == 4 && (
        <div onClick={onPress} className={style.button}>
          Launch
        </div>
      )}
    </div>
  );
};

export default Launch;
