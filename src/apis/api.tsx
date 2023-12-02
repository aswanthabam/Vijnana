import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { _EventInfo } from "../types";
import { baseURL } from "../config";

/* set the token */

export const set_token = (user_id: string, token: string) => {
  localStorage.setItem("userId", user_id);
  localStorage.setItem("token", token);
  // publicRouter.defaults.headers.common.Authorization = "Bearer " + token;
};

/* get the auth token if exists */

export const get_token = (): string | null => {
  return localStorage.getItem("token");
};

/* Public Router that passes the token as bearer and get the api domain form config */

export const publicRouter = axios.create({
  baseURL: baseURL,
});

publicRouter.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = get_token();
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* Validate a given api response, format the given AxiosResponse to ApiResponse with the nessesary params */

export const validateResponse = async (
  res1: Promise<AxiosResponse<any, any>>
): Promise<ApiResponse> => {
  var r: ResponseType;
  var d: ResponseData;
  var dr: ResponseStatus;
  try {
    var data;
    try {
      var res = await res1;
      data = res.data;
    } catch (err) {
      data = (err as AxiosError).response!.data;
    }
    if (data) {
      if (data["data"] && data["message"]) {
        r = ResponseType.DATA;
        if (data["status"] && data["status"] == "success") {
          dr = ResponseStatus.SUCCESS;
        } else {
          dr = ResponseStatus.FAILED;
        }
        d = { message: data["message"], data: data["data"] };
      } else if (!data["data"] && data["message"]) {
        r = ResponseType.NO_DATA;
        if (data["status"] && data["status"] == "success") {
          dr = ResponseStatus.SUCCESS;
        } else {
          dr = ResponseStatus.FAILED;
        }
        d = { message: data["message"], data: null };
      } else {
        r = ResponseType.ERROR;
        dr = ResponseStatus.FAILED;
        d = {
          message: "Unexpected Error Occured !",
          data: null,
        };
      }
    } else {
      r = ResponseType.ERROR;
      dr = ResponseStatus.FAILED;
      d = {
        message: "Unexpected Error Occured !",
        data: null,
      };
    }
  } catch (err) {
    r = ResponseType.ERROR;
    dr = ResponseStatus.FAILED;
    d = {
      message: "Unexpected Error Occured !",
      data: null,
    };
  }
  return { status: dr, contentType: r, data: d };
};

/* API Response types and enums */

export enum LoginStatus {
  ERROR = "Invalid",
  STEP1 = "Step 1",
  STEP2 = "Step 2",
}

export type ApiResponse = {
  status: ResponseStatus;
  contentType: ResponseType;
  data: ResponseData;
};

export type ResponseData = {
  message: string;
  data: ResponseDataType;
};

export enum ResponseType {
  DATA = 1,
  NO_DATA = 2,
  ERROR = 3,
}

export enum ResponseStatus {
  SUCCESS = 5,
  FAILED = 6,
}

export type ResponseDataType = {} | [] | null | undefined;
