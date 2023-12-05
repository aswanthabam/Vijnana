import styles from "./LoginButton.module.css";
import React from "react";
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
    </div>
  );
};

export default LoginButton;
