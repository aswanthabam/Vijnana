import style from "./Dashboard.module.css";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { userDetails } from "../../apis/userApi";
import { useLoader } from "../../components/toploader/useLoader";
import { useToast } from "../../components/toast/useToast";
import { useNavigate } from "react-router-dom";
import { _UserDetails } from "../../utils/types";
import UserCard from "../../components/usercard/UserCard";
import EventList from "../../components/eventlist/EventList";
import { myEvents } from "../../apis/eventApi";
interface DashboardProps {
  // Dashboard: _Dashboard;
}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  var { addLoader } = useLoader();
  var { setToastStatus } = useToast();
  const [user, setUserDetails] = useState<_UserDetails | null>();
  const [parEvents, setParEvents] = useState<[] | null>(null);
  var redirect = useNavigate();

  useEffect(() => {
    userDetails(addLoader, setToastStatus).then((val: _UserDetails | null) => {
      setUserDetails(val);
      if (!val) {
        setToastStatus(true, "Please login to continue!", 3000);
        redirect("/register");
        return;
      } else if (val.step < 2) {
        setToastStatus(
          true,
          "Your registration is not complete! Please complete the registration to contine",
          3000
        );
        redirect("/register/details");
        return;
      }
      myEvents(addLoader, setToastStatus).then((pars) => {
        setParEvents(pars);
      });
    });
  }, []);
  return (
    <div className={style.dashboard}>
      <div className={style.page}>
        {/* <span>Dashboard</span> */}
        {user && <UserCard details={user!} participations={parEvents} />}
        <span className={style.info}>
          Please click 'Register' on the events you wish to participate
        </span>
        <EventList />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
