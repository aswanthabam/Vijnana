import styles from "./LoginButton.module.css";
import React from "react";
import googleIcon from "../../../assets/google.png";

interface LoginButtonProps {
  onClick: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className={styles.loginButton}>
      <div className={styles.icon}>
        <img src={googleIcon} />
      </div>
      <div className={styles.text}>
        <span>Register</span>
      </div>
    </div>
  );
};

export default LoginButton;
