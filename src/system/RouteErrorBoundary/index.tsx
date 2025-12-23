import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Result, Button } from "antd";
import React from "react";
import { Layout } from "@/providers";

export const RouteError: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    const status = error.status;

    if (status === 404) {
      return (
        <Result
          status="404"
          title="Page Not Found"
          subTitle="The page you are looking for does not exist."
          extra={<Button href="/">Back Home</Button>}
        />
      );
    }

    if (status === 403) {
      return (
        <Result
          status="403"
          title="Access Denied"
          subTitle="You don’t have permission to access this page."
        />
      );
    }

    return (
      <Result
        status="500"
        title="Request Failed"
        subTitle={error.statusText || "Unexpected server response."}
      />
    );
  }

  if (error instanceof Error) {
    return (
      <Result
        status="500"
        title="Application Error"
        subTitle={error.message}
        extra={<Button onClick={() => location.reload()}>Reload</Button>}
      />
    );
  }

  return (
    <Result
      status="500"
      title="Unknown Error"
      subTitle="Something went wrong."
    />
  );
};

export const RouteErrorBoundary = () => {
  return (
    <Layout.Centered>
      <RouteError />
    </Layout.Centered>
  );
};
