import React from "react";
import { Flex, Layout, theme } from "antd";
import { LayoutBanner } from "./Banner";
import { LayoutHeader } from "./Header";
import { LayoutBottomMenu, LayoutMenu } from "./Menu";
import { useCurrentRoute } from "@/hooks";
import { LayoutFooter } from "./Footer";
import { LAYOUT } from "@/config";

const { Header, Content, Sider, Footer } = Layout;

export const LayoutProvider: React.FC = () => {
  const {
    token: { colorBorderSecondary },
  } = theme.useToken();
  const { route, element } = useCurrentRoute();

  const border = `1px solid ${colorBorderSecondary}`;
  const layoutMode = route?.layout || "default";

  if (layoutMode === "blank") return element;
  if (layoutMode === "centered")
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255)",
          }}
        >
          {element}
        </Content>
        <Footer
          style={{
            padding: LAYOUT.PADDING,
            backgroundColor: "rgba(255, 255, 255)",
          }}
        >
          <LayoutFooter />
        </Footer>
      </Layout>
    );

  return (
    <Layout>
      <Header
        style={{
          padding: 0,
          position: "sticky",
          top: 0,
          zIndex: 1,
          borderBottom: border,
          backdropFilter: "blur(6px)",
        }}
      >
        <Flex>
          <Flex
            style={{
              width: LAYOUT.SIDER_WIDTH,
              borderRight: border,
              height: LAYOUT.HEADER_HEIGHT,
            }}
            align="center"
            justify="center"
          >
            <LayoutBanner />
          </Flex>
          <div
            style={{
              flex: 1,
              padding: "0 16px",
              boxSizing: "border-box",
            }}
          >
            <LayoutHeader />
          </div>
        </Flex>
      </Header>

      <Layout>
        <Sider
          style={{
            overflow: "hidden",
            height: `calc(100vh - ${LAYOUT.HEADER_HEIGHT}px)`,
            position: "sticky",
            insetInlineStart: 0,
            top: LAYOUT.HEADER_HEIGHT,
            borderRight: border,
          }}
          width={LAYOUT.SIDER_WIDTH}
        >
          <Flex
            vertical
            style={{
              height: "100%",
            }}
          >
            <div
              style={{
                flex: 1,
                overflow: "auto",
                scrollbarWidth: "thin",
              }}
            >
              <LayoutMenu />
            </div>
            <LayoutBottomMenu />
          </Flex>
        </Sider>
        <Layout>
          <Content
            style={{
              margin: `${LAYOUT.PADDING}px ${LAYOUT.PADDING}px 0`,
            }}
          >
            {element}
          </Content>
          <Footer
            style={{
              padding: LAYOUT.PADDING,
            }}
          >
            <LayoutFooter />
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
