import { _UserDetails } from "../types";
import { handle_error_message, publicRouter } from "./api";

export const registerUser = async (
  user: _UserDetails,
  setLoading: (status: boolean) => void,
  setToast: (
    status: boolean,
    message: string | null,
    hideAfter: number | null
  ) => void
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
          setToast(true, "Successfully Created Account!", 3000);
          console.log("Token: ", val.data["data"]["token"]);
        } else {
          status = false;

          setToast(true, "An Unexpected Issue occured!", 3000);
        }
      } else {
        // api_error_code
        handle_error_message(val, setToast);
        status = false;
      }
    })
    .catch((err) => {
      handle_error_message(err.response, setToast);
      status = false;
    });
  setLoading(false);
  return status;
};
