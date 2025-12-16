import { LayoutProvider, ThemeProvider } from "./providers";

export const App = () => {
  return (
    <ThemeProvider>
      <LayoutProvider />
    </ThemeProvider>
  );
};
