import React, { useState } from "react";
import { Flex, Layout, theme } from "antd";
import { LayoutBanner } from "./Banner";
import { LayoutHeader } from "./Header";
import { LayoutBottomMenu, LayoutMenu } from "./Menu";
import { Outlet, useMatches } from "react-router-dom";
import { LayoutFooter } from "./Footer";
import { LAYOUT } from "@/config";

const { Header, Content, Sider, Footer } = Layout;

export const LayoutProvider: React.FC = () => {
  const {
    token: { colorBorderSecondary },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  const border = `1px solid ${colorBorderSecondary}`;
  const matches = useMatches();
  const last = matches[matches.length - 1];
  const layoutMode = (last?.handle as any)?.layout || "default";

  if (layoutMode === "blank") return <Outlet />;

  if (layoutMode === "centered") {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            padding: LAYOUT.PADDING,
            backgroundColor: "#fff",
          }}
        >
          <LayoutFooter />
        </Footer>
      </Layout>
    );
  }

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        width={LAYOUT.SIDER_WIDTH}
        style={{
          height: "100vh",
          position: "sticky",
          top: LAYOUT.HEADER_HEIGHT,
          insetInlineStart: 0,
          borderRight: border,
          overflow: "hidden",
        }}
      >
        <Flex vertical style={{ height: "100%" }}>
          <div
            style={{
              height: LAYOUT.HEADER_HEIGHT,
              borderBottom: border,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <LayoutBanner collapsed={collapsed} />
          </div>
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
        <Header
          style={{
            padding: 0,
            position: "sticky",
            top: 0,
            zIndex: 10,
            height: LAYOUT.HEADER_HEIGHT,
            borderBottom: border,
            backdropFilter: "blur(6px)",
          }}
        >
          <Flex
            style={{
              height: "100%",
              padding: `${LAYOUT.SMALL_PADDING} ${LAYOUT.PADDING}`,
              boxSizing: "border-box",
            }}
            align="center"
          >
            <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          </Flex>
        </Header>

        <Layout>
          <Content
            style={{
              margin: `${LAYOUT.PADDING} ${LAYOUT.PADDING} 0`,
            }}
          >
            <Outlet />
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
