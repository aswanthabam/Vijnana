import axios, { AxiosError, AxiosResponse } from "axios";
import { _EventInfo } from "../types";
import { baseURL } from "../config";

/* get the auth token if exists */

export const get_token = (): string | null => {
  return localStorage.getItem("token");
};

/* Public Router that passes the token as bearer and get the api domain form config */

export const publicRouter = axios.create({
  baseURL: baseURL,
  headers: { authorization: "Bearer " + get_token() },
});

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

export type ApiResponse = {
  status: ResponseStatus;
  contentType: ResponseType;
  data: ResponseData;
};

export type ResponseData = {
  message: string;
  data: {} | [] | null | undefined;
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
