import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginContainer from "../../module/login/page/login.container";
import DashboardContainer from "../../module/dashboad/dashboard.container";
import MasterContainer from "../../module/_master/page/master.container";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MasterContainer />,
    Component: MasterContainer,
    children: [
      {
        index: true,
        Component: DashboardContainer,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginContainer />,
  },
]);

export default router;
