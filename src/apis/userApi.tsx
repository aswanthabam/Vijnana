import { _UserDetails } from "../types";
import { handle_error_message, publicRouter } from "./api";

export const registerUser = async (
  user: _UserDetails,
  setLoading: (status: boolean) => void
): Promise<boolean> => {
  setLoading(true);
  var status = true;
  var res = publicRouter.post("/api/v2/users/create", user);
  await res
    .then((val) => {
      console.log(val.data);
      if (val.data["status"] && val.data["status"] == "success") {
        if (val.data["data"] && val.data["data"]["token"]) {
          localStorage.setItem("token", val.data["data"]["token"]);
          localStorage.setItem("userId", val.data["data"]["userId"]);
        } else {
          status = false;
        }
      } else {
        // api_error_code
        handle_error_message(val);
        status = false;
      }
    })
    .catch((err) => {
      handle_error_message(err.response);
      status = false;
    });
  setLoading(false);
  return status;
};
