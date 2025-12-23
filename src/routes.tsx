import {
  createBrowserRouter,
  Outlet,
  type RouteObject,
} from "react-router-dom";
import { Result } from "antd";
import {
  AppstoreOutlined,
  DashboardOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import {
  Dashboard,
  HelpCenter,
  Login,
  ProductDetails,
  Settings,
  Product,
} from "./pages";
import { LayoutProvider } from "./providers";
import type { IRouteType } from "./types";
import { RouteErrorBoundary } from "./system/RouteErrorBoundary";

const routes: IRouteType[] = [
  {
    path: "/login",
    element: <Login />,
    handle: {
      layout: "blank",
      auth: false,
    },
  },
  {
    path: "/",
    element: <>Landing Page</>,
    handle: {
      layout: "centered",
      auth: false,
    },
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    handle: {
      menu: {
        label: "Dashboard",
        icon: <DashboardOutlined />,
      },
    },
  },
  {
    path: "/products",
    element: <Outlet />,
    handle: {
      menu: {
        label: "Catalogs",
        icon: <AppstoreOutlined />,
      },
      permissions: ["Products"],
    },
    children: [
      {
        index: true,
        element: <Product />,
        handle: {
          menu: {
            label: "Products",
          },
        },
      },
      {
        path: ":id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/settings",
    element: <Settings />,
    handle: {
      menu: {
        position: "bottom",
        label: "Settings",
        icon: <SettingOutlined />,
      },
    },
  },
  {
    path: "/help-center",
    element: <HelpCenter />,
    handle: {
      menu: {
        position: "bottom",
        label: "Help Center",
        icon: <QuestionCircleOutlined />,
      },
    },
  },
  {
    path: "/404",
    element: <>Not Found</>,
    handle: {
      layout: "centered",
      auth: false,
    },
  },
  {
    path: "*",
    element: <Result status="404" title="404" subTitle="Not Found" />,
    handle: {
      auth: false,
    },
  },
];

const normalizeRoutes = (routes: IRouteType[]): IRouteType[] =>
  routes.map((route) => {
    const handle = {
      auth: true,
      layout: "default",
      permissions: [],
      ...route.handle,
      menu: route.handle?.menu
        ? {
            position: "top",
            ...route.handle?.menu,
          }
        : undefined,
    };

    return {
      ...route,
      handle,
      children: route.children ? normalizeRoutes(route.children) : undefined,
    };
  });

const normalizedRoutes = normalizeRoutes(routes);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutProvider routes={normalizedRoutes} />,
    children: normalizedRoutes as unknown as RouteObject[],
    errorElement: <RouteErrorBoundary />,
  },
]);
