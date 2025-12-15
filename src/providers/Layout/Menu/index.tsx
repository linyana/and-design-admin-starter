import { theme } from "antd";
import { LayoutRouteMenu } from "./RouteMenu";

export const LayoutMenu: React.FC = () => <LayoutRouteMenu position="top" />;

export const LayoutBottomMenu: React.FC = () => {
  const {
    token: { colorBorderSecondary },
  } = theme.useToken();

  return (
    <LayoutRouteMenu
      position="bottom"
      style={{
        borderTop: `1px solid ${colorBorderSecondary}`,
      }}
    />
  );
};
