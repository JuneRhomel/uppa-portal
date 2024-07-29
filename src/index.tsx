import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from '@radix-ui/themes';
import "./application/css/index.css";
import { RouterProvider } from "react-router-dom";
import router from "./application/route/uppa.route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '@radix-ui/themes/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Theme appearance={"dark"}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Theme>
      <ToastContainer
        style={{fontSize: "13px", minHeight: "30px !important"}}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme= "dark"
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
  </React.StrictMode>
);
