import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import type { IRouteType } from "@/types";
import { useGlobal, useMessage } from "@/hooks";
import { NoAccess } from "@/pages";
import React, { useEffect } from "react";
import { useAuth } from "@/services";
import { hasAllPermissions } from "@/utils";

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

  if (!route?.handle?.auth) return <>{children}</>;

  useEffect(() => {
    if (!token) {
      message.warning("You've been signed out. Please log in again.");
      navigate("/login", { replace: true });
      return;
    }
    if (!user) {
      fetchData();
    }
  }, [token, user]);

  if (!token) return null;
  if (!user || loading)
    return (
      <Spin
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100%",
        }}
      />
    );

  if (!hasAllPermissions(permissions, route.handle.permissions))
    return <NoAccess />;

  return <>{children}</>;
};
