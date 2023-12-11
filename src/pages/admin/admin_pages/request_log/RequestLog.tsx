import React, { useEffect, useState } from "react";
import {
  _AdminRequestLog,
  _Event,
  _EventCreateData,
  _EventInfo,
} from "../../../../utils/types";
import { requestLog } from "../../../../apis/adminApi";

const RequestLog: React.FC = () => {
  const [logs, setLogs] = useState<_AdminRequestLog[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const getLogs = (limit = 10) => {
    requestLog(limit).then((res) => {
      console.log(res);
      setLogs(res ? res : []);
    });
  };

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <div>
      <h3 className="underline start" style={{ marginBottom: "30px" }}>
        Request Logs
      </h3>
      <input
        type="number"
        placeholder="Limit"
        onChange={(e) => {
          setLimit(parseInt(e.target.value));
        }}
      />
      <input
        type="button"
        value="Refresh"
        onClick={() => {
          getLogs(limit);
        }}
      />
      {logs.map((l) => {
        return (
          <div className="card m-2">
            <div className="card-body">
              <h6 className="card-title ">
                URL : {l.url} ({l.status})
              </h6>
              <p className="card-text">
                Request :{" "}
                <code>
                  {l.data ? JSON.stringify(l.data, [], 2) : "No data"}
                </code>
                <br />
                Response :{" "}
                <code>
                  {l.response
                    ? JSON.stringify(l.response, null, 2)
                    : "No Response"}
                </code>
                <br />
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RequestLog;
