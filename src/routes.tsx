import {
  Dashboard,
  HelpCenter,
  Login,
  Product,
  ProductDetails,
  Settings,
} from "./pages";
import {
  AppstoreOutlined,
  DashboardOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { Navigate } from "react-router-dom";
import type { IRouteType } from "@/types";

export const routes: IRouteType[] = [
  {
    path: "/login",
    element: <Login />,
    layout: "blank",
  },
  {
    path: "/",
    element: <>Landing Page</>,
    layout: "centered",
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
    menu: {
      label: "Catalogs",
      icon: <AppstoreOutlined />,
    },
    children: [
      {
        path: "products",
        element: <Product />,
        menu: { label: "Products" },
        children: [
          {
            path: ":id",
            element: <ProductDetails />,
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
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];
