import './TextButton.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'boxicons/css/boxicons.css'
import React from 'react';
interface TextButtonProps {
  text: string;
  icon : string | null;
  type : string;
}

const TextButton : React.FC<TextButtonProps> = ({icon,text,type}) => {
  return <div className={`text-button type-` + type }>
    <div className='text'>
      <span>{text}</span>
    </div>
    { icon && <div className='icon'>
      <i className={icon}></i>
    </div>}
  </div>;
}

export default TextButton;