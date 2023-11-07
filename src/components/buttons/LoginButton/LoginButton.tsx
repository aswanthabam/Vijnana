import styles from './LoginButton.module.css';
import React from 'react';

interface LoginButtonProps {
  
}

const LoginButton : React.FC<LoginButtonProps> = ({}) => {
  return <div className={styles.loginButton}>
    <div className={styles.icon}>
      <i className='bi bi-door-open'></i>
    </div>
    <div className={styles.text}>
      <span>Login</span>
    </div>
  </div>;
}

export default LoginButton;