import type { ThemeConfig } from "antd";

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: "#333333",
    controlItemBgActive: "#e0e0e0",
  },
  components: {
    Layout: {
      headerBg: "rgba(255, 255, 255, 0.85)",
      siderBg: "rgba(255, 255, 255, 0.85)",
    },
  },
};
