import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./providers";
import { router } from "./providers";

export const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
