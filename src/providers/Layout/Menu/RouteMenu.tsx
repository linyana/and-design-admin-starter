import React, { useMemo, useState, useEffect } from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "@/routes";
import type { IMenuPositionType, IRouteType } from "@/types";
import { nanoid } from "nanoid";

const isMenuRoute = (position: IMenuPositionType) => (route: IRouteType) => {
  const { menu, path = "" } = route;
  if (!menu) return false;
  const pos = (menu.position ?? "top") === position;
  const valid = path && !path.includes(":") && !path.includes("*");
  return pos && valid;
};

const joinPaths = (basePath: string, subPath?: string) => {
  if (!subPath) return basePath;
  return `${basePath.replace(/\/$/, "")}/${subPath.replace(/^\//, "")}`;
};

const buildMenuItem = (route: IRouteType) => {
  const children = Array.isArray(route.children)
    ? route.children
        .filter((c) => c.menu)
        .map((c) => ({
          key: joinPaths(route.path as string, c.path),
          label: c.menu?.label,
          icon: c.menu?.icon,
        }))
    : [];

  return {
    key: route.path || nanoid(),
    label: route.menu?.label,
    icon: route.menu?.icon,
    ...(children.length ? { children } : {}),
  };
};

const collectKeys = (items: any[]): string[] =>
  items.flatMap((item) => [
    item.key,
    ...(item.children ? collectKeys(item.children) : []),
  ]);

export const LayoutRouteMenu: React.FC<{
  position: IMenuPositionType;
  style?: React.CSSProperties;
}> = ({ position, style }) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const items = useMemo(
    () => routes.filter(isMenuRoute(position)).map(buildMenuItem),
    [position]
  );

  const selectedKey = useMemo(() => {
    const pathname = location.pathname;
    const keys = collectKeys(items);
    return keys.reduce(
      (match, key) =>
        pathname.startsWith(key) && key.length > match.length ? key : match,
      ""
    );
  }, [location.pathname, items]);

  useEffect(() => {
    if (!selectedKey) return;
    const parentKeys = items
      .filter((item) =>
        item.children?.some((child: any) => child.key === selectedKey)
      )
      .map((item) => item.key);
    setOpenKeys((prev) => Array.from(new Set([...prev, ...parentKeys])));
  }, [selectedKey, items]);

  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKey ? [selectedKey] : []}
      items={items}
      onClick={(e) => navigate(e.key)}
      style={style}
      openKeys={openKeys}
      onOpenChange={(keys) => setOpenKeys(keys as string[])}
    />
  );
};
