import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import type { IRouteType } from "@/types";
import { useGlobal, useMessage } from "@/hooks";
import { useAuth } from "@/services";
import { hasAllPermissions } from "@/utils";
import { Layout } from "../Layout";
import { useEffect } from "react";

export const AuthProvider: React.FC<{
  route: IRouteType;
  children: React.ReactNode;
}> = ({ route, children }) => {
  const { token, user, permissions, actions } = useGlobal();
  const message = useMessage();
  const navigate = useNavigate();

  const { fetchData, loading } = useAuth({
    success: {
      action: ({ data }) => {
        actions.set({
          user: {
            email: data.user_email,
            name: data.user_name,
            avatar: data.avatar,
          },
          permissions: data.permissions || [],
        });
      },
    },
    error: {
      action: () => {
        actions.logout();
      },
    },
  });

  const needAuth = route?.handle?.auth;

  useEffect(() => {
    if (needAuth) {
      if (!token) {
        message.warning("You've been signed out. Please log in again.");
        navigate("/login", { replace: true });
        return;
      }
      if (!user) {
        fetchData();
      }
    }
  }, [token, user, needAuth]);

  if ((needAuth && !user) || loading)
    return (
      <Layout.Centered>
        <Spin size="large" />
      </Layout.Centered>
    );

  if (!hasAllPermissions(permissions, route?.handle?.permissions)) {
    throw new Response("Forbidden", {
      status: 403,
      statusText: "Access denied",
    });
  }

  return <>{children}</>;
};
