import style from "./Home.module.css";
// import SecondaryButton from '../../components/buttons/secondary_button/SecondaryButton';
import alien from "../../assets/dehill-spacelove-1-dribble.gif";
import Counter from "../../components/counter/Counter";
// for build commit
interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <div className={style.home}>
      <div className={style.background}>
        <div className={style.topGradient}></div>
        <svg
          className={style.bottomDesign}
          xmlns="http://www.w3.org/2000/svg"
          width="598"
          height="488"
          viewBox="0 0 598 488"
          fill="none"
        >
          <path
            d="M-2.13721 2.60027C50.9325 15.2771 71.6006 73.2347 90.7836 127.027C111.703 185.69 130.856 239.399 188.339 224.029C217.184 216.316 231.421 196.464 246.058 176.053C259.085 157.887 272.429 139.279 296.672 128.394C463.654 53.4164 597.863 487.521 597.863 487.521H-2.13721C-2.13721 487.521 -186.328 -41.3976 -2.13721 2.60027Z"
            fill="url(#paint0_linear_2_21)"
          />
          <path
            d="M-2.13721 2.60027C50.9325 15.2771 71.6006 73.2347 90.7836 127.027C111.703 185.69 130.856 239.399 188.339 224.029C217.184 216.316 231.421 196.464 246.058 176.053C259.085 157.887 272.429 139.279 296.672 128.394C463.654 53.4164 597.863 487.521 597.863 487.521H-2.13721C-2.13721 487.521 -186.328 -41.3976 -2.13721 2.60027Z"
            stroke="black"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2_21"
              x1="-2.13722"
              y1="2.60029"
              x2="297.863"
              y2="487.521"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#2F6838" />
              <stop offset="1" stop-color="#072F0D" stop-opacity="0.89" />
            </linearGradient>
          </defs>
        </svg>

        <img className={style.alien} src={alien} />
      </div>
      <div className={style.header}>
        <div className={style.content}>
          <h1>
            Vijnana <span>2.0</span>
          </h1>
          <span className={style.mottoText}>KBM Government College</span>
          <span className="line"></span>
          <span className={style.daysLeft}>
            The countdown to awesomeness begins...
          </span>
          <Counter date={new Date("2023-12-15 00:00:00")} />
          {/* <span className={style.infoText}>"Welcome to Tech Fest 2023, where innovation knows no bounds and technology takes center stage. Our motto, 'Unleash Your Digital Dreams,' embodies our commitment to providing a platform for creative minds to explore, experiment, and excel. Join us in this exhilarating journey, where cutting-edge advancements and imaginative ideas converge to shape the future. Together, we will push the boundaries of what's possible and ignite a new era of possibilities."</span> */}
          {/* <div className={style.headerButtons}>
          <SecondaryButton onClick={()=>{return}}>Explore Events &gt;&gt;</SecondaryButton>
          <SecondaryButton onClick={()=>{return}}>Register &gt;&gt;</SecondaryButton>
          <SecondaryButton onClick={()=>{return}}>Get Connected &gt;&gt;</SecondaryButton>
        </div> */}
        </div>
        {/* <div className={style.date}>
        <span className={style.day}>24</span>
        <span className={style.dayTH}>th</span><br/><br/>
        <span className={style.month}>November</span>
        <span className={style.year}>2023</span>
      </div> */}
      </div>
    </div>
  );
};

export default Home;
