import { theme } from "antd";
import { LayoutRouteMenu } from "./RouteMenu";
import type { IRouteType } from "@/types";

export const LayoutMenu: React.FC<{ routes: IRouteType[] }> = ({ routes }) => (
  <LayoutRouteMenu position="top" routes={routes} />
);

export const LayoutBottomMenu: React.FC<{ routes: IRouteType[] }> = ({
  routes,
}) => {
  const {
    token: { colorBorderSecondary },
  } = theme.useToken();

  return (
    <LayoutRouteMenu
      position="bottom"
      style={{
        borderTop: `1px solid ${colorBorderSecondary}`,
      }}
      routes={routes}
    />
  );
};
