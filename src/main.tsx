import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { MessageApiProvider } from "@/hooks";
import "./main.css";
import { ThemeProvider } from "./providers/index.ts";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <MessageApiProvider>
      <App />
    </MessageApiProvider>
  </ThemeProvider>
);
