import { useGlobal } from "@/hooks";
import { lightTheme } from "./Light";
import { darkTheme } from "./Dark";
import { ConfigProvider } from "antd";
import { basicTheme } from "./basic";

type IPropsType = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: IPropsType) => {
  const { theme } = useGlobal();
  const themeConfig = theme === "light" ? lightTheme : darkTheme;

  return (
    <ConfigProvider
      theme={{
        ...basicTheme,
        ...themeConfig,
      }}
    >
      {children}
    </ConfigProvider>
  );
};
