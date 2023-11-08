import styles from './LoginButton.module.css';
import React from 'react';
import googleIcon from '../../../assets/google.png';

interface LoginButtonProps {
  
}

const LoginButton : React.FC<LoginButtonProps> = ({}) => {
  return <div className={styles.loginButton}>
    <div className={styles.icon}>
      <img src={googleIcon}/>
    </div>
    <div className={styles.text}>
      <span>Register</span>
    </div>
  </div>;
}

export default LoginButton;