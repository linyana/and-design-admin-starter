import React, { useMemo, useState, useEffect } from "react";
import { Menu } from "antd";
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

  const toAbs = (parent: string, child: string | undefined) => {
    if (!child) return parent;
    const a = parent.replace(/\/$/, "");
    const b = child.replace(/^\//, "");
    return `${a}/${b}`;
  };

  const buildItems = (r: any) => {
    const children = Array.isArray(r.children) ? r.children : [];
    if (!children.length) {
      return {
        key: r.path,
        label: labelFromRoute(r),
        icon: r?.handle?.menu?.icon,
      };
    }

    const groups: Record<string, any[]> = {};
    const normal: any[] = [];
    for (const c of children) {
      const g = c?.handle?.menu?.group as string | undefined;
      const type = c?.handle?.menu?.type as string | undefined;
      if (type === "divider") {
        normal.push({ type: "divider" });
        continue;
      }
      const key = toAbs(r.path as string, c.path as string | undefined);
      const item = {
        key,
        label: labelFromRoute(c),
        icon: c?.handle?.menu?.icon,
      };
      if (g) {
        if (!groups[g]) groups[g] = [];
        groups[g].push(item);
      } else {
        normal.push(item);
      }
    }

    const childrenItems: any[] = [];
    for (const name of Object.keys(groups)) {
      childrenItems.push({
        key: `group:${name}:${r.path}`,
        label: name,
        type: "group",
        children: groups[name],
      });
    }
    childrenItems.push(...normal);

    return {
      key: r.path,
      label: labelFromRoute(r),
      icon: r?.handle?.menu?.icon,
      children: childrenItems,
    };
  };

  const items = useMemo(() => menuRoutes.map(buildItems), [menuRoutes]);

  const flattenKeys = (arr: any[]): string[] => {
    const res: string[] = [];
    for (const it of arr) {
      if (typeof it.key === "string" && !String(it.key).startsWith("group:"))
        res.push(it.key as string);
      if (Array.isArray(it.children)) res.push(...flattenKeys(it.children));
    }
    return res;
  };

  const selectedKey = useMemo(() => {
    const pathname = location.pathname;
    const keys = flattenKeys(items);
    let match = "";
    for (const p of keys) {
      if (pathname.startsWith(p) && p.length >= match.length) match = p;
    }
    return match;
  }, [location.pathname, items]);

  const deriveParents = () => {
    if (!selectedKey) return [] as string[];
    const parents: string[] = [];
    for (const it of items) {
      const childKeys = flattenKeys(it.children || []);
      if (childKeys.includes(selectedKey)) parents.push(it.key as string);
    }
    return parents;
  };

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    setOpenKeys((prev) => {
      const parents = deriveParents();
      const merged = Array.from(new Set([...prev, ...parents]));
      return merged;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKey, items]);

  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKey ? [selectedKey] : []}
      items={items}
      onClick={(e) => navigate(e.key)}
      styles={{
        root: {
          border: "none",
        },
      }}
      openKeys={openKeys}
      onOpenChange={(keys) => setOpenKeys(keys as string[])}
      style={style}
    />
  );
};
