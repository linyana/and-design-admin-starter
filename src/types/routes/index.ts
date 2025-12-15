import type { ReactNode } from "react";

export type LayoutMode = "layout" | "none" | "blank";

export type MenuPosition = "top" | "bottom";

export type MenuMeta = {
  position?: MenuPosition;
  title?: string;
  icon?: ReactNode;
  group?: string;
  type?: "divider";
};

export type RouteHandle = {
  menu?: MenuMeta;
  layout?: LayoutMode;
};

export type IRouteType = {
  path?: string;
  element?: ReactNode;
  children?: IRouteType[];
  handle?: RouteHandle;
};
