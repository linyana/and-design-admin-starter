import { useHttp, type IHttpType } from "@/hooks";
import type { IMeResponseType } from "./types";

export * from "./types";

export const useAuth = (data?: IHttpType) => {
  return useHttp<{
    response: IMeResponseType;
  }>({
    url: "/users/auth",
    method: "get",
    ...data,
  });
};

