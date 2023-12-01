import { _EventInfo } from "../types";
import { publicRouter } from "./api";

export const getEvents = async (
  eventId: string | null | undefined,
  setLoading: (status: boolean) => void,
  setToast: (
    status: boolean,
    message: string | null,
    hideAfter: number | null
  ) => void
) => {
  setLoading(true);
  if (eventId) {
    var res = await publicRouter.get("/api/v2/events/get?id=" + eventId);
  } else {
    var res = await publicRouter.get("/api/v2/events/getAll");
  }
  var d2: Array<_EventInfo> = [];
  // console.log("data", res.data["data"] as _EventInfo[]);
  if (res.data["status"] && res.data["status"] == "success") {
    if (res.data["data"] != undefined && res.data["data"] != null) {
      // var data: EventInfoData[] = res.data["data"] as EventInfoData[];
      console.log(res.data["data"]);
      var data: Array<_EventInfo> = res.data["data"] as Array<_EventInfo>;
      console.log(data);
      //   console.log(data);
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
      console.log(d2);
    } else {
      alert(res.data["message"]);
    }
  } else {
    // api_error_code
  }
  setLoading(false);
  return d2;
};
