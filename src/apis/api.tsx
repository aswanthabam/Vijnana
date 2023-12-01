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
// export type apiDefaultInput = {
//   setToast: (
//     status: boolean,
//     message: string | null,
//     hideAfter: number | null
//   ) => void;
//   setLoading: (status: boolean) => void;
// };
export const handle_error_message = (
  data: any,
  setToast: (
    status: boolean,
    message: string | null,
    hideAfter: number | null
  ) => void
) => {
  console.log(data);
  data = data["data"];
  try {
    // the reponse has data / message but the status is failed
    if (data["message"]) {
      setToast(true, data["message"], 3000);
    }
  } catch (err) {
    // reponse doesnt contain any data
    console.log(err);
    setToast(true, "An unexpected error has occured !", 30001);
  }
};
