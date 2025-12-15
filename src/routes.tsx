import { Dashboard, HelpCenter, Login, Product, ProductDetails, Settings } from "./pages";

import { Navigate } from "react-router-dom";

export const routes = [
  {
    path: "/",
    element: <>Landing Page</>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/products",
    element: <Product />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/products/:id",
    element: <ProductDetails />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/help-center",
    element: <HelpCenter />,
  },
  {
    path: "/404",
    element: <>Not Found</>,
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];
