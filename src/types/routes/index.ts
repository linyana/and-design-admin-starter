import type { RouteObject } from "react-router-dom";
import type { IPermissionType } from "../permissions";

export type ILayoutType = "default" | "blank" | "centered";
export type IMenuPositionType = "top" | "bottom";

export type IMenuType = {
  position?: IMenuPositionType;
  label?: React.ReactNode;
  icon?: React.ReactNode;
};

export type IRouteType = RouteObject & {
  handle?: {
    menu?: IMenuType;
    layout?: ILayoutType;
    auth?: boolean;
    permissions?: IPermissionType[];
  }
  children?: IRouteType[];
};
