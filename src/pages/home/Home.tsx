import React from 'react';
import style from './Home.module.css';

interface HomeProps {

}

const Home : React.FC<HomeProps> = ({}) => {
  return <div className={style.home}>
    <div className={style.background}>
      <div className={style.topGradient}></div>
      <svg className={style.bottomDesign} xmlns="http://www.w3.org/2000/svg" width="597" height="485" viewBox="0 0 597 485" fill="none">
        <path d="M-3 0L187.476 221.429L295.81 125.794L597 484.921H-3V0Z" fill="#2F6838"/>
      </svg>
    </div>
    
  </div>
}

export default Home;