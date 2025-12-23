import { Layout } from "@/providers";
import { Result } from "antd";

export const NoAccess = () => {
  return (
    <Layout.Centered>
      <Result status="403" title="403" subTitle="No access" />
    </Layout.Centered>
  );
};
