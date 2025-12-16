import logo from "@/assets/logo/logo.svg";
import { Flex, Typography } from "antd";

const { Title } = Typography;

export const LayoutBanner = () => (
  <Flex
    style={{
      height: "100%",
    }}
    align="center"
    justify="center"
    gap="small"
  >
    <img
      src={logo}
      alt="logo"
      style={{
        height: "calc(100% - 32px)",
      }}
    />
    <Title level={4} style={{ margin: 0 }}>
      Ant Design
    </Title>
  </Flex>
);
