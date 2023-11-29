import style from "./TopLoader.module.css";
import { useLoader } from "./useLoader";

interface TopLoaderProps {}

const TopLoader: React.FC<TopLoaderProps> = () => {
  const { status } = useLoader();
  return status ? (
    <div className={style.toploader}>
      <div className={style.loader}></div>
    </div>
  ) : (
    <></>
  );
};

export default TopLoader;
