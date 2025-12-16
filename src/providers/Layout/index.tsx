import React from "react";
import { Flex, Layout, theme } from "antd";
import { LayoutBanner } from "./Banner";
import { LayoutHeader } from "./Header";
import { LayoutBottomMenu, LayoutMenu } from "./Menu";
import { useCurrentRoute } from "@/hooks";
import { LayoutFooter } from "./Footer";

const { Header, Content, Footer, Sider } = Layout;

const headerHeight = 64;

export const LayoutProvider: React.FC = () => {
  const {
    token: { colorBorderSecondary },
  } = theme.useToken();
  const { route, element } = useCurrentRoute();

  const border = `1px solid ${colorBorderSecondary}`;
  const siderWidth = 255;

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
          }}
        >
          {element}
        </Content>
        <Footer>
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
              width: siderWidth,
              borderRight: border,
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
            height: `calc(100vh - ${headerHeight}px)`,
            position: "sticky",
            insetInlineStart: 0,
            top: headerHeight,
            borderRight: border,
          }}
          width={siderWidth}
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
          <Content style={{ margin: "16px 16px 0", overflow: "initial" }}>
            {element}
          </Content>
          <Footer>
            <LayoutFooter />
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
