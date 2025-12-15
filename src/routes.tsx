import { Dashboard, Login, Product, ProductDetails } from "./pages";

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
    path: "/404",
    element: <>Not Found</>,
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];
