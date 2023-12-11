import React, { useEffect, useState } from "react";
import { _Event, _EventCreateData, _EventInfo } from "../../../../utils/types";
import { useToast } from "../../../../components/toast/useToast";
import { getEvents } from "../../../../apis/eventApi";
import { useLoader } from "../../../../components/toploader/useLoader";
import { Link } from "react-router-dom";

const ViewEvent: React.FC = () => {
  const [events, setEvents] = useState<_EventInfo[]>([]); // [
  const { setToastStatus } = useToast();
  const { addLoader } = useLoader();
  useEffect(() => {
    getEvents(null, addLoader, setToastStatus, 10).then((res) => {
      setEvents(res ? res : []);
    });
  }, []);
  return (
    <div>
      <h3 className="underline start" style={{ marginBottom: "30px" }}>
        Registered Users List
      </h3>
      {events.map((event) => {
        return (
          <div className="card m-2">
            <div className="card-body">
              <h5 className="card-title">{event.name}</h5>
              <p className="card-text">{event.description}</p>
              <Link
                className="btn btn-primary m-1"
                to={"/admin/events/edit/" + event.id}
              >
                Edit Event
              </Link>
              <Link
                className="btn btn-secondary m-1"
                to={"/events/" + event.id}
              >
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
