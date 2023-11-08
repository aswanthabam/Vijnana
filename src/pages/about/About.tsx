import React from 'react';
import style from './About.module.css';

interface AboutProps {

}

const About : React.FC<AboutProps> = ({}) => {
  return <div className={style.about}>
    About
  </div>
}

export default About;