import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginContainer from "../../module/login/page/login.container";
import DashboardContainer from "../../module/dashboad/dashboard.container";
import MasterContainer from "../../module/_master/page/master.container";
import PropertiesContainer from "../../module/properties/page/properties.container";
import TenantContainer from "../../module/tenant/page/tenent.container";
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
      {
        path: "/properties",
        Component: PropertiesContainer,
      },
      {
        path: "/tenants",
        Component: TenantContainer,
      }
    ],
  },

  {
    path: "/login",
    element: <LoginContainer />,
  },
]);

export default router;
