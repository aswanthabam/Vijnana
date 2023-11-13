import React from 'react';
import style from './SecondaryButton.module.css';

interface SecondaryButtonProps {
  children: string,
  onClick: (()=>void)
}

const SecondaryButton : React.FC<SecondaryButtonProps> = ({children,onClick}) => {
  return <div className={style.secondaryButton} onClick={onClick}>
    {children}
  </div>
}

export default SecondaryButton;