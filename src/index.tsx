import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import "./application/css/index.css";
import { RouterProvider } from "react-router-dom";
import router from "./application/route/uppa.route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@radix-ui/themes/styles.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "styled-components";
import { schemaThemeDark, schemaThemeLight } from "./application/theme/color.theme";

const queryClient = new QueryClient();
const rootElement = document.getElementById("root") as HTMLElement;
const theme = localStorage.getItem("theme");


ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <ThemeProvider theme={theme === "light" ? schemaThemeLight : schemaThemeDark}>
      <Theme appearance={theme as "light" | "dark"}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Theme>
    </ThemeProvider>
  </React.StrictMode>
);

