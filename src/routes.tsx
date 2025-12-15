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
    handle: {
      menu: { position: "top", title: "Home", icon: <HomeOutlined /> },
    },
  },
  {
    path: "/login",
    element: <Login />,
    handle: {
      layout: "blank",
    },
  },
  {
    path: "/products",
    element: <Product />,
    handle: {
      menu: {
        position: "top",
        title: "Products",
        icon: <AppstoreOutlined />,
      },
    },
    children: [
      {
        path: "list",
        element: <Product />,
        handle: { menu: { title: "List" } },
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    handle: {
      menu: {
        position: "top",
        title: "Dashboard",
        icon: <DashboardOutlined />,
      },
    },
  },
  {
    path: "/products/:id",
    element: <ProductDetails />,
    handle: {},
  },
  {
    path: "/settings",
    element: <Settings />,
    handle: {
      menu: {
        position: "bottom",
        title: "Settings",
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
        title: "Help Center",
        icon: <QuestionCircleOutlined />,
      },
    },
  },
  {
    path: "/404",
    element: <>Not Found</>,
    handle: { layout: "blank" },
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];
