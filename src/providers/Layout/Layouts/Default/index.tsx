import { LAYOUT } from "@/config";
import type { IRouteType } from "@/types";
import { Flex, Layout, theme } from "antd";
import { useState } from "react";
import { Banner } from "../../Banner";
import { LayoutBottomMenu, LayoutMenu } from "../../Menu";
import { Header } from "../../Header";
import { Footer } from "../../Footer";

type IPropsType = {
  children: React.ReactNode;
  routes: IRouteType[];
};

export const DefaultLayout = ({ routes, children }: IPropsType) => {
  const {
    token: { colorBorderSecondary },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  const border = `1px solid ${colorBorderSecondary}`;

  return (
    <Layout>
      <Layout.Sider
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
            <Banner collapsed={collapsed} />
          </div>
          <div
            style={{
              flex: 1,
              overflow: "auto",
              scrollbarWidth: "thin",
            }}
          >
            <LayoutMenu routes={routes} />
          </div>
          <LayoutBottomMenu routes={routes} />
        </Flex>
      </Layout.Sider>

      <Layout>
        <Layout.Header
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
            <Header collapsed={collapsed} setCollapsed={setCollapsed} />
          </Flex>
        </Layout.Header>

        <Layout>
          <Layout.Content
            style={{
              margin: `${LAYOUT.PADDING} ${LAYOUT.PADDING} 0`,
            }}
          >
            {children}
          </Layout.Content>

          <Layout.Footer
            style={{
              padding: LAYOUT.PADDING,
            }}
          >
            <Footer />
          </Layout.Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
