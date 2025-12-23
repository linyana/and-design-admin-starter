import {
  Dashboard,
  HelpCenter,
  Login,
  ProductList,
  ProductDetails,
  Settings,
} from "./pages";
import {
  AppstoreOutlined,
  DashboardOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { Outlet } from "react-router-dom";
import type { IRouteType } from "@/types";
import { Result } from "antd";

export const routes: IRouteType[] = [
  {
    path: "/login",
    element: <Login />,
    layout: "blank",
    auth: false,
  },
  {
    path: "/",
    element: <>Landing Page</>,
    layout: "centered",
    auth: false,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    menu: {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
  },
  {
    path: "/catalogs",
    element: <Outlet />,
    menu: {
      label: "Catalogs",
      icon: <AppstoreOutlined />,
    },
    permissions: ["Products"],
    children: [
      {
        path: "products",
        element: <Outlet />,
        menu: { label: "Products" },
        permissions: ["Products"],
        children: [
          {
            index: true,
            element: <ProductList />,
            permissions: ["Products"],
          },
          {
            path: ":id",
            element: <ProductDetails />,
            permissions: ["Products"],
          },
        ],
      },
    ],
  },
  {
    path: "/settings",
    element: <Settings />,
    menu: {
      position: "bottom",
      label: "Settings",
      icon: <SettingOutlined />,
    },
    permissions: ["Settings"],
  },
  {
    path: "/help-center",
    element: <HelpCenter />,
    menu: {
      position: "bottom",
      label: "Help Center",
      icon: <QuestionCircleOutlined />,
    },
  },
  {
    path: "/404",
    element: <>Not Found</>,
    layout: "centered",
    auth: false,
  },
  {
    path: "*",
    element: <Result status="404" title="404" subTitle="Not Found" />,
    auth: false,
  },
];

