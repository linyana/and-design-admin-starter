import type { IUserType } from "@/types";

export type IMeResponseType = IUserType;

export type ILoginRequestType = {
  email: string;
  password: string;
};

export type ILoginResponseType = {
  access: string;
  refresh: string;
  name: string;
  id: string;
  email: string;
};
