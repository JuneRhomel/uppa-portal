import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from '@radix-ui/themes';
import "./application/css/index.css";
import { RouterProvider } from "react-router-dom";
import router from "./application/route/uppa.route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '@radix-ui/themes/styles.css';
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Toaster position="top-right"  reverseOrder={false} />
    <Theme appearance={"dark"}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Theme>
  </React.StrictMode>
);
