import {
  _UserDetails,
  _UserLogin,
  _UserStep1,
  _UserStep2,
} from "../utils/types";
import {
  LoginStatus,
  ResponseStatus,
  ResponseType,
  publicRouter,
  set_token,
  validateResponse,
} from "./api";

/* STATUS AND DETAILS ENDPOINT */

export const userDetails = async (
  addLoader: (loader: Promise<any>) => void,
  setToast: (
    status: boolean,
    message: string | null,
    hideAfter: number | null
  ) => void
): Promise<_UserDetails | null> => {
  var res = publicRouter.post("/api/v2/users/details");
  addLoader(res);
  var val = await validateResponse(res);
  if (val.status == ResponseStatus.FAILED) {
    setToast(true, val.data.message, 3000);
  }
  if (val.contentType == ResponseType.DATA) {
    var step = (val.data.data as any)["step"] as number;
    localStorage.setItem("step", step + "");
    return val.data.data as _UserDetails;
  }
  return null;
};

/* LOGIN ENDPOINT */

export const loginEmail = async (
  user: _UserLogin,
  addLoader: (loader: Promise<any>) => void,
  setToast: (
    status: boolean,
    message: string | null,
    hideAfter: number | null
  ) => void
): Promise<LoginStatus> => {
  var res = publicRouter.post("/api/v2/users/login", user);
  addLoader(res);
  var val = await validateResponse(res);
  setToast(true, val.data.message, 3000);
  if (val.status == ResponseStatus.SUCCESS) {
    if (val.contentType == ResponseType.DATA) {
      var token = (val.data.data as any)["token"] as string;
      var userId = (val.data.data as any)["userId"] as string;
      var step = (val.data.data as any)["step"] as string;
      set_token(userId, token);
      localStorage.setItem("step", step);
      if (step == "2") return LoginStatus.STEP2;
      else return LoginStatus.STEP1;
    }
  }
  return LoginStatus.ERROR;
};

/* REGISTRATION ENDPOINTS */

/* Complete the registration by enering additional data */

export const completeRegistration = async (
  user: _UserStep2,
  addLoader: (loader: Promise<any>) => void,
  setToast: (
    status: boolean,
    message: string | null,
    hideAfter: number | null
  ) => void
): Promise<boolean> => {
  var res = publicRouter.post("/api/v2/users/createAccount/complete", user);
  addLoader(res);
  var val = await validateResponse(res);
  setToast(true, val.data.message, 3000);
  if (val.status == ResponseStatus.SUCCESS) {
    if (val.contentType == ResponseType.DATA) {
      localStorage.setItem("email", (val.data.data as any)["email"] as string);
      var step = (val.data.data as any)["step"] as string;
      localStorage.setItem("step", step);
    }
    return true;
  }
  return false;
};

/* Create account bby enering name,email and password manually */

export const createAccount = async (
  user: _UserStep1,
  addLoader: (loader: Promise<any>) => void,
  setToast: (
    status: boolean,
    message: string | null,
    hideAfter: number | null
  ) => void
): Promise<boolean> => {
  var res = publicRouter.post("/api/v2/users/createAccount", user);
  addLoader(res);
  var val = await validateResponse(res);
  setToast(true, val.data.message, 3000);
  if (val.status == ResponseStatus.SUCCESS) {
    if (val.contentType == ResponseType.DATA) {
      var token = (val.data.data as any)["token"] as string;
      var userId = (val.data.data as any)["userId"] as string;
      var step = (val.data.data as any)["step"] as string;
      set_token(userId, token);
      localStorage.setItem("step", step);
      return true;
    }
  }
  return false;
};

/* Create account by entering details via google */

export const createAccountGoogle = async (
  credential: string,
  addLoader: (loader: Promise<any>) => void,
  setToast: (
    status: boolean,
    message: string | null,
    hideAfter: number | null
  ) => void
): Promise<LoginStatus> => {
  var res = publicRouter.post("/api/v2/users/createAccount/google", {
    credential: credential,
  });
  addLoader(res);
  var val = await validateResponse(res);
  setToast(true, val.data.message, 3000);
  if (val.status == ResponseStatus.SUCCESS) {
    if (val.contentType == ResponseType.DATA) {
      var token = (val.data.data as any)["token"] as string;
      var userId = (val.data.data as any)["userId"] as string;
      var step = (val.data.data as any)["step"] as string;
      set_token(userId, token);
      localStorage.setItem("step", step);
      if (step == "2") return LoginStatus.STEP2;
      else return LoginStatus.STEP1;
    }
  }
  return LoginStatus.ERROR;
};
