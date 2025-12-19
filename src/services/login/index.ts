import { useHttp, type IHttpType } from "@/hooks";
import type { ILoginRequestType, ILoginResponseType } from "./types";
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
