import "./Dashboard.css";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import Notification from "../../components/Notification/Notification";
export default function Dashboard(){
  return (
    <div className="dashboard">
      <LogoutButton/>
      <Notification text="Sample text"/>
    </div>
  );
};