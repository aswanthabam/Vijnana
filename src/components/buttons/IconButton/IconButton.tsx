import './IconButton.css';
import React from 'react';
interface IconButtonProps {
  icon : string;
  text: string | null;
  type : string;
}

const IconButton : React.FC<IconButtonProps> = ({icon,text,type}) => {
  return <div className={`icon-button type-` + type }>
    <div className='icon'>
      <i className={icon}></i>
    </div>
    { text && <div className='text'>
      <span>{text}</span>
    </div> }
  </div>;
}

export default IconButton;