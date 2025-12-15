import React from "react";
import { Menu, theme } from "antd";
import type { MenuProps } from "antd";
import { SettingOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const items: MenuProps["items"] = [
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Settings",
  },
  {
    key: "help",
    icon: <QuestionCircleOutlined />,
    label: "Help Center",
  },
];

export const LayoutBottomMenu: React.FC = () => {
  const {
    token: { colorBorderSecondary },
  } = theme.useToken();

  return (
    <Menu
      mode="inline"
      selectable={false}
      items={items}
      style={{
        borderTop: `1px solid ${colorBorderSecondary}`,
      }}
      styles={{
        root: {
          border: "none",
        },
      }}
    />
  );
};
