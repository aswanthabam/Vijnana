import styles from "./LoginButton.module.css";
import React, { useEffect } from "react";
import googleIcon from "../../../assets/google.png";

interface LoginButtonProps {
  onClick: () => void;
  text: String;
  iconVisible: boolean;
}
const LoginButton: React.FC<LoginButtonProps> = ({
  onClick,
  text,
  iconVisible,
}) => {
  return (
    <div onClick={onClick} className={styles.loginButton}>
      {iconVisible && (
        <div className={styles.icon}>
          <img src={googleIcon} />
        </div>
      )}
      <div className={styles.text}>
        <span>{text}</span>
      </div>
      {/* <div
        className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin"
        data-size="large"
        data-logo_alignment="left"
      ></div> */}
      {/* <div
        id="g_id_onload"
        data-client_id="1025507377861-ksv14u42p6c0bes203hkbki7n56u6v80.apps.googleusercontent.com"
        data-context="signup"
        data-ux_mode="popup"
        data-callback={googleSignIn}
        data-auto_select="true"
        data-itp_support="true"
      ></div> */}
    </div>
  );
};

export default LoginButton;
