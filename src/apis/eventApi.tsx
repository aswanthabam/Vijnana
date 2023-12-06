import { _EventInfo } from "../utils/types";
import {
  ResponseStatus,
  ResponseType,
  publicRouter,
  validateResponse,
} from "./api";

/*
  myEvents() function returns a list of events participating events from the backend.
  @param setLoading: (status: boolean) => void
  @param setToast: (status: boolean, message: string | null, hideAfter: number | null) => void
  @returns [] | null
*/

export const myEvents = async (
  addLoader: (loader: Promise<any>) => void,
  setToast: (
    status: boolean,
    message: string | null,
    hideAfter: number | null
  ) => void
): Promise<[] | null> => {
  var res = publicRouter.post("/api/v2/events/myEvents");
  addLoader(res);
  var val = await validateResponse(res);
  if (val.status == ResponseStatus.SUCCESS) {
    if (val.contentType == ResponseType.DATA) {
      var data = val.data.data;
      var events: [] = (data as any)["events"];
      return events;
    }
  }
  setToast(true, val.data.message, 3000);
  return null;
};

/* 
  getEvents() function returns a list of events from the backend.
  @param eventId: string | null | undefined
  @param setLoading: (status: boolean) => void
  @param setToast: (status: boolean, message: string | null, hideAfter: number | null) => void
  @returns Array<_EventInfo> | null
*/

export const getEvents = async (
  eventId: string | null | undefined,
  addLoader: (loader: Promise<any>) => void,
  setToast: (
    status: boolean,
    message: string | null,
    hideAfter: number | null
  ) => void
): Promise<Array<_EventInfo> | null> => {
  setToast(false, null, null);
  if (eventId) {
    var res = publicRouter.get("/api/v2/events/get?id=" + eventId);
  } else {
    var res = publicRouter.get("/api/v2/events/getAll");
  }
  addLoader(res);
  var val = await validateResponse(res);

  var d2: Array<_EventInfo> = [];

  if (val.status == ResponseStatus.SUCCESS) {
    if (val.contentType == ResponseType.DATA) {
      var data = val.data.data as Array<_EventInfo>;
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        var data2 = data[i];
        var date: Date = new Date(data2!["date"]);
        const dateString = date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }); // Output: Dec 25, 2023
        const timeString = date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }); // Output: 10:11 PM
        data2.time = timeString;
        data2.date = dateString;
        console.log(data2);
        d2.push(data2);
      }
      return d2;
    }
  }
  setToast(true, val.data.message, 3000);
  return null;
};
