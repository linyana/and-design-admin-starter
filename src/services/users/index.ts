import { useHttp, type IHttpType } from "@/hooks";
import type {
  ILoginRequestType,
  ILoginResponseType,
  IMeResponseType,
} from "./types";

export * from "./types";

export const useLogin = (data: IHttpType<ILoginRequestType>) => {
  return useHttp<{
    response: ILoginResponseType;
  }>({
    url: "/users/sessions",
    method: "post",
    ...data,
  });
};

export const useAuth = (data?: IHttpType) => {
  return useHttp<{
    response: IMeResponseType;
  }>({
    url: "/users/auth",
    method: "get",
    ...data,
  });
};
