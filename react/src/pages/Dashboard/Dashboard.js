import "./Dashboard.css";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import Notification from "../../components/Notification/Notification";
import UserCard from "../../components/UserCard/UserCard";
export default function Dashboard(){
  return (
    <div className="dashboard">
      <LogoutButton/>
      <UserCard/>
    </div>
  );
};