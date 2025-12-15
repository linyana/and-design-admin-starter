import React from "react";
import { Flex, Layout, theme } from "antd";
import { LayoutBanner } from "./Banner";
import { LayoutHeader } from "./Header";
import { LayoutBottomMenu, LayoutMenu } from "./Menu";
import { useLocation, useRoutes, matchRoutes } from "react-router-dom";
import { routes } from "@/routes";

const { Header, Content, Footer, Sider } = Layout;

const headerHeight = 64;

export const LayoutProvider: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorBorderSecondary },
  } = theme.useToken();

  const border = `1px solid ${colorBorderSecondary}`;
  const siderWidth = 255;

  const location = useLocation();
  const element = useRoutes(routes);
  const matches = matchRoutes(routes, location) || [];
  const last = matches[matches.length - 1]?.route as any;
  const layoutMode =
    (last?.handle?.layout as "none" | "blank" | "layout") || "layout";

  if (layoutMode === "blank") return element;
  if (layoutMode === "none")
    return (
      <Layout>
        <Content style={{ margin: "16px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {element}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
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
            <div
              style={{
                padding: 24,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {element}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
