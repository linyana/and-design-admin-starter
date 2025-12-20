export type ILayoutType = "default" | "blank" | "centered";

export type IMenuPositionType = "top" | "bottom";

export type IMenuType = {
  position?: IMenuPositionType;
  label?: React.ReactNode;
  icon?: React.ReactNode;
};

export type IRouteType = {
  path?: string;
  element?: React.ReactNode;
  children?: IRouteType[];
  menu?: IMenuType;
  layout?: ILayoutType;
};
