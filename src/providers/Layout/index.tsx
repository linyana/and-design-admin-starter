import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Flex, Layout, Menu, theme } from "antd";
import { Banner } from "./Banner";
import { Header as HeaderComponent } from "./Header";

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

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
            <Banner />
          </Flex>
          <div
            style={{
              flex: 1,
              padding: "0 16px",
              boxSizing: "border-box",
            }}
          >
            <HeaderComponent />
          </div>
        </Flex>
      </Header>

      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: `calc(100vh - ${headerHeight}px)`,
            position: "sticky",
            insetInlineStart: 0,
            top: headerHeight,
            scrollbarWidth: "thin",
            borderRight: border,
          }}
          width={siderWidth}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
            styles={{
              root: {
                border: "none",
              },
            }}
          />
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
