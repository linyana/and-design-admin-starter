import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./providers";
import { MessageApiProvider } from "./hooks";
import { router } from "./routes";

export const App = () => {
  return (
    <MessageApiProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </MessageApiProvider>
  );
};
