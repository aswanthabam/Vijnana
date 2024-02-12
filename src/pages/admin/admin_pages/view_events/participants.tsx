import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvents } from "../../../../apis/eventApi";
import { useLoader } from "../../../../components/toploader/useLoader";
import { useToast } from "../../../../components/toast/useToast";
import { _EventInfo } from "../../../../utils/types";
import { userDetailsAdmin } from "../../../../apis/userApi";
import styles from "./participants.module.css";

export type Participant = {
  userId: string;
  name: string;
  course: string;
  college: string;
  email: string;
  phone: string;
  date: string;
  year: string;
};
export default function Participants() {
  const [contents, setContents] = useState({
    userId: true,
    name: true,
    course: true,
    college: true,
    email: true,
    phone: true,
    date: true,
    remarks: false,
    sd: true,
    year: true,
  });
  const { id = null } = useParams();
  const { addLoader } = useLoader();
  const { setToastStatus } = useToast();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [event, setEvent] = useState<_EventInfo | null>(null);
  const printDocument = () => {
    const input = document.getElementById("pdfCont")!;
    var a = window.open("", "", "height=500, width=500")!;
    a.document.write("<html>");
    a.document.write(
      "<style>table td {" +
        "min-width: 100px;border: 1px solid #121212;padding: 5px; white-space: nowrap;}" +
        ".watermark {width:40%;display:flex;position:fixed;top:50%;left:50%;opacity:20%;font-weight: 900; font-size:40px;transform: translate(-50%,-50%)  ;}" +
        "</style>"
    );
    a.document.write(input.innerHTML);
    a.document.write(
      "<img src='https://vijnana.web.app/assets/logo-66928a27.png' class='watermark'/>"
    );
    a.document.write("</body></html>");
    a.document.close();

    a.print();
  };
  useEffect(() => {
    setParticipants([]);
    getEvents(id, addLoader, setToastStatus).then((res) => {
      console.log(res);
      var event = res![0];
      setEvent(event);
      if (res) {
        for (var p in event.participants) {
          var date = (event.participants[p].date = new Date(
            event.participants[p].date
          ).toLocaleString("en-us", {
            hour12: true,
            hour: "numeric",
            month: "short",
            day: "numeric",
            minute: "numeric",
            year: "numeric",
          }));
          userDetailsAdmin(event.participants[p].userId, addLoader).then(
            (res) => {
              participants.push({
                userId: res!.userId,
                name: res!.name,
                course: res!.course,
                college: res!.college,
                email: res!.email,
                phone: res!.phone.toString(),
                date: date,
                year: res!.year.toString(),
              });
              setParticipants(participants);
            }
          );
        }
      }
    });
  }, [id]);
  return (
    <div className={styles.participantsPage}>
      <div
        className={
          styles.displayItems + " bg-info p-3 rounded bg-opacity-25 mb-4"
        }
      >
        <h3 className="">Display Items</h3>
        <div className="container">
          <div className="row">
            <div className="item col m-1">
              <input
                checked={contents.userId}
                onChange={(e) => {
                  setContents({ ...contents, userId: e.currentTarget.checked });
                }}
                type="checkbox"
                className="m-1"
              ></input>
              <label>User ID</label>
            </div>
            <div className="item col m-1">
              <input
                checked={contents.name}
                onChange={(e) => {
                  setContents({ ...contents, name: e.currentTarget.checked });
                }}
                type="checkbox"
                className="m-1"
              />
              <label>Name</label>
            </div>
            <div className="item col m-1">
              <input
                checked={contents.course}
                onChange={(e) => {
                  setContents({ ...contents, course: e.currentTarget.checked });
                }}
                type="checkbox"
                className="m-1"
              />
              <label>Course</label>
            </div>
          </div>
          <div className="row">
            <div className="item col m-1">
              <input
                checked={contents.year}
                onChange={(e) => {
                  setContents({ ...contents, year: e.currentTarget.checked });
                }}
                type="checkbox"
                className="m-1"
              />
              <label>Year</label>
            </div>
            <div className="item col m-1">
              <input
                checked={contents.email}
                onChange={(e) => {
                  setContents({ ...contents, email: e.currentTarget.checked });
                }}
                type="checkbox"
                className="m-1"
              />
              <label>Email ID</label>
            </div>
            <div className="item col m-1">
              <input
                checked={contents.phone}
                onChange={(e) => {
                  setContents({ ...contents, phone: e.currentTarget.checked });
                }}
                type="checkbox"
                className="m-1"
              />
              <label>Phone</label>
            </div>
          </div>
          <div className="row">
            <div className="item col m-1">
              <input
                checked={contents.date}
                onChange={(e) => {
                  setContents({ ...contents, date: e.currentTarget.checked });
                }}
                type="checkbox"
                className="m-1"
              />
              <label>Registered On</label>
            </div>
            <div className="item col m-1">
              <input
                checked={contents.remarks}
                onChange={(e) => {
                  setContents({
                    ...contents,
                    remarks: e.currentTarget.checked,
                  });
                }}
                type="checkbox"
                className="m-1"
              />
              <label>Remarks Column</label>
            </div>
            <div className="item col m-1">
              <input
                checked={contents.sd}
                onChange={(e) => {
                  setContents({ ...contents, sd: e.currentTarget.checked });
                }}
                type="checkbox"
                className="m-1"
              />
              <label>Sign Column</label>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={printDocument}>
        Print &nbsp;{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-printer"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
          <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
        </svg>
      </button>
      <div id="pdfCont">
        <center>
          {event && (
            <>
              <h6 className="fw-bold">Participants List</h6>
              <h2 className="underlined fw-bold">{event.name}</h2>
              <hr />
              <br />
            </>
          )}
          {event && (
            <table className="table table-striped table-info rounded p-3 w-100">
              <thead>
                <tr>
                  {contents.userId && (
                    <th>
                      <b>User ID</b>
                    </th>
                  )}
                  {contents.name && (
                    <th>
                      <b>Name</b>
                    </th>
                  )}
                  {contents.course && (
                    <th>
                      <b>Course</b>
                    </th>
                  )}
                  {contents.year && (
                    <th>
                      <b>Year</b>
                    </th>
                  )}
                  {contents.email && (
                    <th>
                      <b>Email</b>
                    </th>
                  )}
                  {contents.phone && (
                    <th>
                      <b>Phone</b>
                    </th>
                  )}
                  {contents.date && (
                    <th>
                      <b>Reg. On</b>
                    </th>
                  )}
                  {contents.remarks && (
                    <th>
                      <b>Remarks</b>
                    </th>
                  )}
                  {contents.sd && (
                    <th>
                      <b>S/D</b>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {participants.map((user) => (
                  <tr>
                    {contents.userId && <td>{user.userId}</td>}
                    {contents.name && <td>{user.name}</td>}
                    {contents.course && <td>{user.course}</td>}
                    {contents.year && <td>{user.year}</td>}
                    {contents.email && <td>{user.email}</td>}
                    {contents.phone && <td>{user.phone}</td>}
                    {contents.date && (
                      <td>
                        {new Date(user.date).toLocaleString("en-us", {
                          hour12: true,
                          hour: "numeric",
                          month: "short",
                          day: "numeric",
                          minute: "numeric",
                          year: "numeric",
                        })}
                      </td>
                    )}
                    {contents.remarks && <td></td>}
                    {contents.sd && <td></td>}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </center>
      </div>
    </div>
  );
}
