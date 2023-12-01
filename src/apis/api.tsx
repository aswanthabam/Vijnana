import axios from "axios";
import { _EventInfo } from "../types";
import { baseURL } from "../config";
export const get_token = (): string | null => {
  return localStorage.getItem("token");
};
export const publicRouter = axios.create({
  baseURL: baseURL,
  headers: { authorization: "Bearer " + get_token() },
});

export const handle_error_message = (data: any) => {
  console.log(data);
  data = data["data"];
  try {
    // the reponse has data / message but the status is failed
    if (data["message"]) {
      alert(data["message"]);
    }
  } catch (err) {
    // reponse doesnt contain any data
    console.log(err);
    alert("An unexpected error has occured !");
  }
};
