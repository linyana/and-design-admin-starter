import logo from "@/assets/logo/logo.svg";
import { LAYOUT } from "@/config";
import { Flex, Typography } from "antd";

const { Title } = Typography;

type IPropsType = {
  collapsed: boolean;
};

export const LayoutBanner = ({ collapsed }: IPropsType) => (
  <Flex
    align="center"
    justify={"center"}
    style={{
      height: "100%",
      paddingInline: LAYOUT.PADDING,
    }}
  >
    <img
      src={logo}
      alt="logo"
      style={{
        height: `calc(100% - ${LAYOUT.PADDING} - ${LAYOUT.PADDING})`,
        flexShrink: 0,
        transition: "transform 0.2s ease",
      }}
    />

    <div
      style={{
        maxWidth: collapsed ? 0 : 200,
        overflow: "hidden",
        transition: "max-width 0.2s ease",
        marginLeft: collapsed ? 0 : LAYOUT.SMALL_PADDING,
      }}
    >
      <Title
        level={4}
        style={{
          margin: 0,
          whiteSpace: "nowrap",
          opacity: collapsed ? 0 : 1,
          transform: collapsed ? "translateX(-6px)" : "translateX(0)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          pointerEvents: collapsed ? "none" : "auto",
        }}
      >
        Admin Starter
      </Title>
    </div>
  </Flex>
);
