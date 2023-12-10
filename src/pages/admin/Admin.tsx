import { useEffect, useState } from "react";
import style from "./Admin.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { isAdmin } from "../../apis/adminApi";

interface AdminProps {}

const Admin: React.FC<AdminProps> = ({}) => {
  const [admin, setAdmin] = useState<boolean>(false);
  const redirect = useNavigate();
  useEffect(() => {
    isAdmin().then((res) => {
      setAdmin(res);
      if (!res) redirect("/");
    });
    document.head.innerHTML +=
      '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">';
    document.head.innerHTML +=
      '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>';
  }, []);
  return admin ? (
    <div className={style.admin + " container-fluid row"}>
      <div className="col-3">
        <h3 style={{ textAlign: "center" }}>Vijnana Admin</h3>
        <ul className="list-group">
          <li className="list-group-item">About Event</li>
          <li className="list-group-item">Events</li>
          <li className="list-group-item">Add Event</li>
          <li className="list-group-item">Add Admin</li>
          <li className="list-group-item">Users</li>
        </ul>
      </div>
      <div className={style.content + " col-9"}>
        <Outlet />
      </div>
    </div>
  ) : (
    <div>Admin permission required ..</div>
  );
};

export default Admin;
