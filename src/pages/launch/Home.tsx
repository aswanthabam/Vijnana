import style from "./LaunchHome.module.css";
// import SecondaryButton from '../../components/buttons/secondary_button/SecondaryButton';
import alien from "../../assets/dehill-spacelove-1-dribble.gif";
// import Counter from "../../components/counter/Counter";
// import EventList from "../../components/eventlist/EventList";
// import Footer from "../../components/footer/Footer";
import TopBar from "../../components/topbar/topbar";
import { useState } from "react";
// for build commit
interface LaunchHomeProps {}

const LaunchHome: React.FC<LaunchHomeProps> = ({}) => {
  var [dots, setDots] = useState("...");

  setInterval(async () => {
    if (dots.length > 2) await setDots("");
    else await setDots(dots + ".");
    // setDots(dots);
  }, 1000);
  return (
    <div className={style.home}>
      <TopBar
        theme="dark"
        setSidebarState={() => {}}
        setTheme={() => {}}
        sidebarState={false}
        className={style.topbar}
      />
      <div className={style.background}>
        <div className={style.topGradient}></div>
        <svg
          className={style.bottomDesign}
          xmlns="http://www.w3.org/2000/svg"
          width="598"
          height="488"
          viewBox="0 0 598 488"
          fill="none"
        >
          <path
            d="M-2.13721 2.60027C50.9325 15.2771 71.6006 73.2347 90.7836 127.027C111.703 185.69 130.856 239.399 188.339 224.029C217.184 216.316 231.421 196.464 246.058 176.053C259.085 157.887 272.429 139.279 296.672 128.394C463.654 53.4164 597.863 487.521 597.863 487.521H-2.13721C-2.13721 487.521 -186.328 -41.3976 -2.13721 2.60027Z"
            fill="url(#paint0_linear_2_21)"
          />
          <path
            d="M-2.13721 2.60027C50.9325 15.2771 71.6006 73.2347 90.7836 127.027C111.703 185.69 130.856 239.399 188.339 224.029C217.184 216.316 231.421 196.464 246.058 176.053C259.085 157.887 272.429 139.279 296.672 128.394C463.654 53.4164 597.863 487.521 597.863 487.521H-2.13721C-2.13721 487.521 -186.328 -41.3976 -2.13721 2.60027Z"
            stroke="black"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2_21"
              x1="-2.13722"
              y1="2.60029"
              x2="297.863"
              y2="487.521"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2F6838" />
              <stop offset="1" stopColor="#072F0D" stopOpacity="0.89" />
            </linearGradient>
          </defs>
        </svg>

        <img className={style.alien} src={alien} />
      </div>
      <div className={style.header}>
        <div className={style.content}>
          <h1>
            VIJÑ
            <div className={style.topLineA}>A</div>
            NA <span className="sparkblink-1">2.0</span>
          </h1>
          {/* <img style={{ height: 300 }} src="/logo.png" /> */}
          <span className={style.mottoText}>
            KBM Government College Thalassery
          </span>
          <span className="line"></span>
          <span className={style.daysLeft}>
            <span>Coming Soon </span>
            {/* <span className={style.dots}>{dots}</span> */}
          </span>

          {/* <Counter
            className={style.counter}
            date={new Date("2023-12-15 00:00:00")}
          /> */}
        </div>
      </div>
      {/* <div className={style.page2}>
        <h2 className="underline">Events</h2>
        <br />
        <EventList limit={4} />
      </div>
      <Footer /> */}
    </div>
  );
};

export default LaunchHome;
