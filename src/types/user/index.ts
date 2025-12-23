import type { IPermissionType } from "../permissions";

export type IUserType = {
  id?: string;
  email?: string;
  name?: string;
  avatar?: string
  permissions?: IPermissionType[];
};
