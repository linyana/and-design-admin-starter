import type { IPermissionType, IUserType } from "@/types";

export type IThemeType = "light" | "dark";

export type IStateType = {
  token: string;
  theme: IThemeType;
  permissions: IPermissionType[];
  user: IUserType | null;
  apiBaseUrl: string;
};

export type IStateActionsType = {
  set: (state: Partial<IStateType>) => void;
  reset: (state?: Partial<IStateType>) => void;
  logout: () => void;
};

export type IGlobalStateType = IStateType & {
  actions: IStateActionsType;
};
