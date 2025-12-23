import { Outlet, useMatches } from "react-router-dom";
import type { ILayoutType, IRouteType } from "@/types";
import { Layout } from "./Layouts";
import { AuthProvider } from "../Auth";

export * from "./Layouts";

export const LayoutProvider: React.FC<{ routes: IRouteType[] }> = ({
  routes,
}) => {
  const matches = useMatches();
  const route = matches[matches.length - 1] as IRouteType;

  if (!route) {
    return null;
  }
  const layoutMode = route?.handle?.layout as ILayoutType;

  const layoutObject = {
    blank: Layout.Blank,
    centered: Layout.Centered,
    default: Layout.Default,
  };

  const LayoutComponent = layoutObject[layoutMode] || Layout.Default;

  return (
    <AuthProvider route={route}>
      <LayoutComponent routes={routes}>
        <Outlet />
      </LayoutComponent>
    </AuthProvider>
  );
};
