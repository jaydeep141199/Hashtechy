import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

createRoot(document.getElementById("root")!).render(
 <StrictMode>
      <MantineProvider  >
        <Notifications position="top-right" autoClose={1000}
        transitionDuration={200} />
        <App />
      </MantineProvider>
    </StrictMode>
);
