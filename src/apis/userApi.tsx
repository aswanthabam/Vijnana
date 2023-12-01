import { _UserDetails, _UserLogin, _UserStep1, _UserStep2 } from "../types";
import {
  ResponseStatus,
  ResponseType,
  publicRouter,
  validateResponse,
} from "./api";

/* LOGIN ENDPOINT */

export const loginEmail = async (
  user: _UserLogin,
  setLoading: (status: boolean) => void,
  setToast: (
    status: boolean,
    message: string | null,
    hideAfter: number | null
  ) => void
): Promise<boolean> => {
  setLoading(true);
  var res = publicRouter.post("/api/v2/users/login", user);
  var val = await validateResponse(res);
  setToast(true, val.data.message, 3000);
  if (val.status == ResponseStatus.SUCCESS) {
    if (val.contentType == ResponseType.DATA) {
      var token = (val.data.data as any)["token"] as string;
      var userId = (val.data.data as any)["userId"] as string;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      setLoading(false);
      return true;
    }
  }
  setLoading(false);
  return false;
};

/* REGISTRATION ENDPOINTS */

/* Complete the registration by enering additional data */

export const completeRegistration = async (
  user: _UserStep2,
  setLoading: (status: boolean) => void,
  setToast: (
    status: boolean,
    message: string | null,
    hideAfter: number | null
  ) => void
): Promise<boolean> => {
  setLoading(true);
  var res = publicRouter.post("/api/v2/users/createAccount/complete", user);
  var val = await validateResponse(res);
  setToast(true, val.data.message, 3000);
  if (val.status == ResponseStatus.SUCCESS) {
    if (val.contentType == ResponseType.DATA) {
      localStorage.setItem("email", (val.data.data as any)["email"] as string);
      var step = (val.data.data as any)["step"] as string;
      localStorage.setItem("step", step);
    }
    setLoading(false);
    return true;
  }
  setLoading(false);
  return false;
};

/* Create account bby enering name,email and password manually */

export const createAccount = async (
  user: _UserStep1,
  setLoading: (status: boolean) => void,
  setToast: (
    status: boolean,
    message: string | null,
    hideAfter: number | null
  ) => void
): Promise<boolean> => {
  setLoading(true);
  var res = publicRouter.post("/api/v2/users/createAccount", user);
  var val = await validateResponse(res);
  setToast(true, val.data.message, 3000);
  if (val.status == ResponseStatus.SUCCESS) {
    if (val.contentType == ResponseType.DATA) {
      var token = (val.data.data as any)["token"] as string;
      var userId = (val.data.data as any)["userId"] as string;
      var step = (val.data.data as any)["step"] as string;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("step", step);
      setLoading(false);
      return true;
    }
  }
  setLoading(false);
  return false;
};

/* Create account by entering details via google */

export const createAccountGoogle = async (
  credential: string,
  setLoading: (status: boolean) => void,
  setToast: (
    status: boolean,
    message: string | null,
    hideAfter: number | null
  ) => void
): Promise<boolean> => {
  setLoading(true);
  var res = publicRouter.post("/api/v2/users/createAccount/google", {
    credential: credential,
  });
  var val = await validateResponse(res);
  setToast(true, val.data.message, 3000);
  if (val.status == ResponseStatus.SUCCESS) {
    if (val.contentType == ResponseType.DATA) {
      var token = (val.data.data as any)["token"] as string;
      var userId = (val.data.data as any)["userId"] as string;
      var step = (val.data.data as any)["step"] as string;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("step", step);
      setLoading(false);
      return true;
    }
  }
  setLoading(false);
  return false;
};
