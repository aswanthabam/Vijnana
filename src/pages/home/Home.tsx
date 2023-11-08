import React from 'react';
import style from './Home.module.css';

interface HomeProps {

}

const Home : React.FC<HomeProps> = ({}) => {
  return <div className={style.home}>
    Home
  </div>
}

export default Home;