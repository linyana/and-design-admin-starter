import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { MessageApiProvider } from "@/hooks";

createRoot(document.getElementById("root")!).render(
  <MessageApiProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MessageApiProvider>
);
