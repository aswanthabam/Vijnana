import style from "../Register.module.css";
import alien from "../../../assets/dehill-spacelove-1-dribble.gif";
import styles from "./RegisterEvent.module.css";
import { useEffect, useState } from "react";
import EventListSmall from "../../../components/eventlistsmall/EventListSmall";
import { userDetails } from "../../../apis/userApi";
import { useLoader } from "../../../components/toploader/useLoader";
import { useToast } from "../../../components/toast/useToast";
import { _UserDetails } from "../../../utils/types";

export const RegisterEvent: React.FC = () => {
  const { addLoader } = useLoader();
  const { setToastStatus } = useToast();
  const [user, setUser] = useState<_UserDetails | null>();
  useEffect(() => {
    console.log("RegisterEvent");
    userDetails(addLoader, setToastStatus).then((res) => {
      if (!res) {
        console.log("error : no user data got");
      } else {
        setUser(res);
      }
    });
  }, []);
  return (
    <div className={style.register}>
      <div className={style.left}>
        {/* <img className={style.logo} src={logo} /> */}
        <div className={style.background}>
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
      </div>
      <div className={style.right}>
        <div className={styles.events}>
          {user && (
            <>
              <h2 className={styles.heading}>Events</h2>
              <p className={styles.info}>
                Click on register on the events you wish to participate.
              </p>
              <EventListSmall gctian={user.gctian} />
              <p className={styles.info}>
                Don't hesitate to contact if you have any queries.{" "}
                <a href="tel:9188670699">Contact</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
