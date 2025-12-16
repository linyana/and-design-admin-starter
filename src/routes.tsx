import {
  Dashboard,
  HelpCenter,
  Login,
  Product,
  ProductDetails,
  Settings,
} from "./pages";
import {
  HomeOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { Navigate } from "react-router-dom";
import type { IRouteType } from "@/types";

export const routes: IRouteType[] = [
  {
    path: "/",
    element: <>Landing Page</>,
    menu: { title: "Home", icon: <HomeOutlined /> },
  },
  {
    path: "/login",
    element: <Login />,
    layout: "blank",
  },
  {
    path: "/catalogs",
    menu: {
      title: "Catalogs",
      icon: <AppstoreOutlined />,
    },
    children: [
      {
        path: "products",
        element: <Product />,
        menu: { title: "Products" },
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
    path: "/dashboard",
    element: <Dashboard />,
    menu: {
      title: "Dashboard",
      icon: <DashboardOutlined />,
    },
  },
  {
    path: "/settings",
    element: <Settings />,
    menu: {
      position: "bottom",
      title: "Settings",
      icon: <SettingOutlined />,
    },
  },
  {
    path: "/help-center",
    element: <HelpCenter />,
    menu: {
      position: "bottom",
      title: "Help Center",
      icon: <QuestionCircleOutlined />,
    },
  },
  {
    path: "/404",
    element: <>Not Found</>,
    layout: "blank",
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];
