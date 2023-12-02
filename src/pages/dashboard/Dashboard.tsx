import style from "./Dashboard.module.css";
import Footer from "../../components/footer/Footer";
import { useEffect } from "react";
import { userDetails } from "../../apis/userApi";
import { useLoader } from "../../components/toploader/useLoader";
import { useToast } from "../../components/toast/useToast";
import { useNavigate } from "react-router-dom";
interface DashboardProps {
  // Dashboard: _Dashboard;
}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  var { setLoaderStatus } = useLoader();
  var { setToastStatus } = useToast();
  var redirect = useNavigate();
  useEffect(() => {
    userDetails(setLoaderStatus, setToastStatus).then(
      (val: {} | null | undefined) => {
        if (!val) {
          setToastStatus(true, "Please login to continue!", 3000);
          redirect("/register");
          return;
        } else if (((val as any)["step"] as number) < 2) {
          setToastStatus(
            true,
            "Your registration is not complete! Please complete the registration to contine",
            3000
          );
          redirect("/register/details");
          return;
        }
      }
    );
  }, []);
  return (
    <div className={style.dashboard}>
      <div className={style.page}>
        <span>Dashboard</span>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
