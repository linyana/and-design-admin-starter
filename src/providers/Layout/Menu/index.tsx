import React, { useMemo } from "react";
import { Menu, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "@/routes";

type Position = "top" | "bottom";

const labelFromRoute = (r: any) => {
  const h = r?.handle?.menu;
  if (h?.title) return h.title as string;
  const path = r?.path || "";
  if (path === "/") return "Home";
  const seg = path.split("/").filter(Boolean).slice(-1)[0] || "";
  return seg.charAt(0).toUpperCase() + seg.slice(1);
};

const isMenuRoute = (position: Position) => (r: any) => {
  const h = r?.handle?.menu;
  const pos = h?.position === position;
  const p = r?.path || "";
  const valid = p && !p.includes(":") && !p.includes("*");
  return pos && valid;
};

export const LayoutRouteMenu: React.FC<{
  position: Position;
  style?: React.CSSProperties;
}> = ({ position, style }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuRoutes = useMemo(
    () => routes.filter(isMenuRoute(position)),
    [position]
  );

  const selectedKey = useMemo(() => {
    const pathname = location.pathname;
    let match = "";
    for (const r of menuRoutes) {
      const p = r.path as string;
      if (p && pathname.startsWith(p) && p.length >= match.length) {
        match = p;
      }
    }
    return match;
  }, [location.pathname, menuRoutes]);

  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKey ? [selectedKey] : []}
      items={menuRoutes.map((r) => ({
        key: r.path,
        label: labelFromRoute(r),
        icon: r?.handle?.menu?.icon,
      }))}
      onClick={(e) => navigate(e.key)}
      styles={{
        root: {
          border: "none",
        },
      }}
      style={style}
    />
  );
};

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
