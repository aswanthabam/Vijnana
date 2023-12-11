import React, { useEffect, useState } from "react";
import {
  _AdminUserList,
  _Event,
  _EventCreateData,
  _EventInfo,
} from "../../../../utils/types";
import { usersList } from "../../../../apis/adminApi";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<_AdminUserList[]>([]);
  useEffect(() => {
    usersList().then((res) => {
      setUsers(res ? res : []);
    });
  }, []);
  return (
    <div>
      <h3 className="underline start" style={{ marginBottom: "30px" }}>
        Registered Users List
      </h3>
      {users.map((u) => {
        return (
          <div className="card m-2">
            <div className="card-body">
              <h3
                style={{
                  width: 300,
                  textOverflow: "visible",
                  whiteSpace: "nowrap",
                }}
                className="card-title underline start mb-4"
              >
                {u.name} asfjha f sag sasfab saf
              </h3>
              <p className="card-text">
                <b>{u.userId}</b>
                <br />
                <b>Registration Status : </b>{" "}
                {u.step === 2 ? "Completed" : "Not Completed"}
                <br />
                <b>College :</b> {u.college}
                <br />
                <b>Course :</b> {u.course} ({u.year})
                <br />
                <b>Email :</b> {u.email}
                <br />
                <b>Phone :</b> {u.phone}
                <br />
                <b>Register Method :</b> {u.is_google ? "Google" : "Email"}
                <br />
                <b>Admin :</b> {u.is_admin ? "Yes" : "No"}
                <br />
                <b>Registered In :</b> {u.participation.length} events
              </p>
              <button className="btn btn-danger m-1" onClick={() => {}}>
                Promote to admin
              </button>
              &nbsp;<code> // Not Implemented Here</code>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
