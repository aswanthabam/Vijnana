import React, { useEffect, useState } from "react";
import {
  _AdminErrorLog,
  _Event,
  _EventCreateData,
  _EventInfo,
} from "../../../../utils/types";
import { errorLog } from "../../../../apis/adminApi";

const ErrorLog: React.FC = () => {
  const [logs, setLogs] = useState<_AdminErrorLog[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const getLogs = (limit = 10) => {
    errorLog(limit).then((res) => {
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
        Error Logs
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
              <h6 className="card-title ">URL : {l.url}</h6>
              <p className="card-text">
                Requested At :{" "}
                <code>{new Date(l.requestTime).toLocaleString()}</code>
                <br />
                Response At :{" "}
                <code>{new Date(l.responseTime).toLocaleString()}</code>
                <br />
                Error : <code>{l.error}</code>
                <br />
                Response : <code>{l.stack}</code>
                <br />
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ErrorLog;
