import React from 'react';
import style from './Home.module.css';
import SecondaryButton from '../../components/buttons/secondary_button/SecondaryButton';

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
    <div className={style.header}>
      <h1>Vijnana <span>2.0</span></h1>
      <span className={style.mottoText}>KBM Government College</span>
      <span className={style.infoText}>"Welcome to Tech Fest 2023, where innovation knows no bounds and technology takes center stage. Our motto, 'Unleash Your Digital Dreams,' embodies our commitment to providing a platform for creative minds to explore, experiment, and excel. Join us in this exhilarating journey, where cutting-edge advancements and imaginative ideas converge to shape the future. Together, we will push the boundaries of what's possible and ignite a new era of possibilities."</span>
      <div className={style.headerButtons}>
        <SecondaryButton onClick={()=>{return}}>Explore Events &gt;&gt;</SecondaryButton>
        <SecondaryButton onClick={()=>{return}}>Register &gt;&gt;</SecondaryButton>
        <SecondaryButton onClick={()=>{return}}>Get Connected &gt;&gt;</SecondaryButton>
      </div>
      <div className={style.date}>
        <span className={style.day}>24</span>
        <span className={style.dayTH}>th</span><br/><br/>
        <span className={style.month}>November</span>
        <span className={style.year}>2023</span>
      </div>
    </div>
  </div>
}

export default Home;