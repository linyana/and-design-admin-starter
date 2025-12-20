import { useLocation, useRoutes, matchRoutes } from "react-router-dom";
import { routes } from "@/routes";
import type { IRouteType } from "@/types";

export const useCurrentRoute = () => {
  const location = useLocation();
  const element = useRoutes(routes);

  const matches = matchRoutes(routes, location) || [];
  const route = matches[matches.length - 1]?.route as IRouteType | undefined;

  return { location, element, route };
};
