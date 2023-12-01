import React, { useState } from "react";
import style from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/Logo KBM.png";
import alien from "../../assets/dehill-spacelove-1-dribble.gif";
import { _EventInfo, _UserDetails, _UserStep1, _UserStep2 } from "../../types";
import { useLoader } from "../../components/toploader/useLoader";
import { useToast } from "../../components/toast/useToast";
import { completeRegistration } from "../../apis/userApi";

interface RegisterStep2Props {}

const RegisterStep2: React.FC<RegisterStep2Props> = ({}) => {
  const [data, setData] = useState<_UserStep2>({
    phone: "",
    college: "",
    course: "",
    year: 0,
    gctian: false,
  });
  var { setLoaderStatus } = useLoader();
  var { setToastStatus } = useToast();
  var redirect = useNavigate();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (await completeRegistration(data, setLoaderStatus, setToastStatus)) {
      redirect("/dashboard");
    }
  };
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
        <form className={style.form} onSubmit={onSubmit}>
          <h2 className="underline">Few More Details</h2>

          <div className={style.gctianCard}>
            <label>Are you a student of KBMGCT ?</label>
            <div className={style.radioButtons}>
              <div>
                <input
                  type="radio"
                  name="gctian"
                  onChange={(e) => {
                    console.log(e);
                    // data.gctian = e.target.checked;
                    // console.log(data.gctian);
                    setData((prev) => {
                      return {
                        ...prev,
                        gctian: e.target.checked,
                        college: "KBMGCT",
                      };
                    });
                    console.log(data);
                  }}
                />
                <span>Yes</span>
              </div>
              <div>
                <input
                  type="radio"
                  name="gctian"
                  onChange={(e) => {
                    console.log(e);
                    setData((prev) => {
                      return { ...prev, gctian: !e.target.checked };
                    });
                  }}
                  // checked={true}
                />
                <span>No</span>
              </div>
            </div>
          </div>
          {data.gctian}
          {data.gctian == true ? (
            <>
              <input
                onChange={(e) => {
                  data.phone = e.target.value;
                  setData(data);
                }}
                type="phone"
                placeholder="Phone No *"
                required
              />
              <input
                onChange={(e) => {
                  data.course = e.target.value;
                  setData(data);
                }}
                type="text"
                placeholder="Course *"
                required
              />
              <input
                onChange={(e) => {
                  data.year = parseInt(e.target.value);
                  setData(data);
                }}
                type="number"
                placeholder="Year *"
                required
              />{" "}
            </>
          ) : (
            <>
              <input
                onChange={(e) => {
                  data.phone = e.target.value;
                  setData(data);
                }}
                type="phone"
                placeholder="Phone No *"
                required
              />
              <input
                onChange={(e) => {
                  data.college = e.target.value;
                  setData(data);
                }}
                type="text"
                placeholder="College Name *"
                required
              />
              <input
                onChange={(e) => {
                  data.course = e.target.value;
                  setData(data);
                }}
                type="text"
                placeholder="Course *"
                required
              />
              <input
                onChange={(e) => {
                  data.year = parseInt(e.target.value);
                  setData(data);
                }}
                type="number"
                placeholder="Year *"
                required
              />{" "}
            </>
          )}

          <button disabled={data.gctian == null}>Complete Setup</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default RegisterStep2;
