import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { MessageApiProvider } from "@/hooks";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <MessageApiProvider>
    <App />
  </MessageApiProvider>
);
