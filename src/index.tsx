import React from "react";
import { Theme } from "@radix-ui/themes";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./application/css/index.css";
import router from "./application/route/uppa.route";
import "@radix-ui/themes/styles.css";
import { schemaThemeDark, schemaThemeLight } from "./application/theme/color.theme";
import ReduxStore from "./infrastructure/redux/store.redux";
const queryClient = new QueryClient();
const rootElement = document.getElementById("root") as HTMLElement;
const theme = localStorage.getItem("theme");


ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={ReduxStore}>
      <Toaster position="top-right" reverseOrder={false} />
      <ThemeProvider theme={theme === "light" ? schemaThemeLight : schemaThemeDark}>
        <Theme appearance={theme as "light" | "dark"}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Theme>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

