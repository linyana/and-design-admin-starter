import { Result } from "antd";

export const NoAccess = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Result status="403" title="403" subTitle="No access" />
    </div>
  );
};

