import React from "react";
import { Flex, Layout, theme } from "antd";
import { LayoutBanner } from "./Banner";
import { LayoutHeader } from "./Header";
import { LayoutMenu } from "./Menu";
import { LayoutBottomMenu } from "./BottomMenu";

const { Header, Content, Footer, Sider } = Layout;

const headerHeight = 64;

export const LayoutProvider: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorBorderSecondary },
  } = theme.useToken();

  const border = `1px solid ${colorBorderSecondary}`;
  const siderWidth = 255;

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
                textAlign: "center",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <p>long content</p>
              {
                // indicates very long content
                Array.from({ length: 100 }, (_, index) => (
                  <React.Fragment key={index}>
                    {index % 20 === 0 && index ? "more" : "..."}
                    <br />
                  </React.Fragment>
                ))
              }
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
