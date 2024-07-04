import React from "react";
import ReactDOM from "react-dom/client";
import "./application/css/index.css";
import { RouterProvider } from "react-router-dom";
import router from "./application/route/uppa.route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}> 
      <RouterProvider router={router} />
     </QueryClientProvider>
  </React.StrictMode>
);
