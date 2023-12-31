import {
  _AdminErrorLog,
  _AdminRequestLog,
  _AdminUserList,
  _EventCreateData,
} from "../utils/types";
import {
  ApiResponse,
  ResponseStatus,
  ResponseType,
  publicRouter,
  validateResponse,
} from "./api";

export const addAdmin = async (
  data: { email: string },
  setToast: (
    status: boolean,
    message: string | null,
    hideAfter: number | null
  ) => void
): Promise<ApiResponse> => {
  var res = publicRouter.post("/api/v2/admin/add_admin", data);
  var val = await validateResponse(res);
  setToast(true, val.data.message, 3000);
  return val;
};

export const errorLog = async (
  count: number = 10
): Promise<_AdminErrorLog[] | null> => {
  var res = publicRouter.get("/api/v2/admin/logs/error?count=" + count);
  var val = await validateResponse(res);
  if (
    val.status == ResponseStatus.SUCCESS &&
    val.contentType == ResponseType.DATA
  ) {
    return (val.data.data as any)["logs"] as _AdminErrorLog[];
  }
  return null;
};

export const requestLog = async (
  count: number = 10
): Promise<_AdminRequestLog[] | null> => {
  var res = publicRouter.get("/api/v2/admin/logs/request?count=" + count);
  var val = await validateResponse(res);
  if (
    val.status == ResponseStatus.SUCCESS &&
    val.contentType == ResponseType.DATA
  ) {
    return (val.data.data as any)["logs"] as _AdminRequestLog[];
  }
  return null;
};

export const usersList = async (): Promise<_AdminUserList[] | null> => {
  var res = publicRouter.post("/api/v2/admin/users");
  var val = await validateResponse(res);
  if (
    val.status == ResponseStatus.SUCCESS &&
    val.contentType == ResponseType.DATA
  ) {
    return (val.data.data as any)["users"] as _AdminUserList[];
  }
  return null;
};

export const isAdmin = async (): Promise<boolean> => {
  var res = publicRouter.post("/api/v2/admin/is_admin");
  var val = await validateResponse(res);
  if (
    val.status == ResponseStatus.SUCCESS &&
    val.contentType == ResponseType.DATA
  ) {
    return (val.data.data as any)["is_admin"] as boolean;
  }
  return false;
};

export const createEvent = async (
  event: _EventCreateData,
  setToast: (
    status: boolean,
    message: string | null,
    hideAfter: number | null
  ) => void
): Promise<ApiResponse> => {
  var res = publicRouter.post("/api/v2/events/create", event);
  var val = await validateResponse(res);
  console.log(val);
  setToast(true, val.data.message, 3000);
  return val;
};
