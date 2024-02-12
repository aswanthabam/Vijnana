import React, { useEffect, useState } from "react";
import { _Event, _EventCreateData, _EventInfo } from "../../../../utils/types";
import { useToast } from "../../../../components/toast/useToast";
import { getEvents } from "../../../../apis/eventApi";
import { useLoader } from "../../../../components/toploader/useLoader";
import { Link, useNavigate } from "react-router-dom";

const ViewEvent: React.FC = () => {
  const [events, setEvents] = useState<_EventInfo[]>([]); // [
  const { setToastStatus } = useToast();
  const { addLoader } = useLoader();
  const redirect = useNavigate();
  useEffect(() => {
    getEvents(null, addLoader, setToastStatus, 10).then((res) => {
      setEvents(res ? res : []);
    });
  }, []);
  return (
    <div>
      <h3 className="underline start" style={{ marginBottom: "30px" }}>
        Event List
      </h3>
      {events.map((event) => {
        return (
          <div className="card m-2">
            <div className="card-body">
              <h5 className="card-title">{event.name}</h5>
              <p className="card-text">{event.description}</p>
              <div className="btn btn-info m-1">
                Total Participants : <b>{event.participants.length} </b>
              </div>
              <button
                onClick={() => {
                  redirect("/admin/participants/" + event.id);
                }}
                className="btn btn-primary m-1"
              >
                Download Participants List &nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-download"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                </svg>
              </button>
              <br />
              <Link
                className="btn btn-primary m-1"
                to={"/admin/events/edit/" + event.id}
              >
                Edit Event
              </Link>
              <Link className="btn btn-secondary m-1" to={"/event/" + event.id}>
                View Event
              </Link>
              <button className="btn btn-danger m-1" onClick={() => {}}>
                Delete Event
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewEvent;
