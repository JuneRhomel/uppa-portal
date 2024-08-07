import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginContainer from "../../module/login/page/login.container";
import DashboardContainer from "../../module/dashboad/dashboard.container";
import MasterContainer from "../../module/_master/page/master.container";
import PropertiesContainer from "../../module/properties/page/properties.container";
import TenantContainer from "../../module/tenant/page/tenent.container";
import ManagePropertyContainer from "../../module/manage_properties/page/manage_property.container";
import MotherMeterWaterContainer from "../../module/mother_meter/mother_meter_water/page/mother_meter_water.container";
import MotherMeterElectricityContainer from "../../module/mother_meter/mother_meter_electricity/page/mother_meter_electricity.container";

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
        path: "/manage-properties",
        Component: ManagePropertyContainer,
      },
      {
        path: "/tenants",
        Component: TenantContainer,
      },
      {
        path: "/mother-meter/water",
        Component: MotherMeterWaterContainer,
      },
      {
        path: "/mother-meter/electricity",
        Component: MotherMeterElectricityContainer,
      }
    ],
  },

  {
    path: "/login",
    element: <LoginContainer />,
  },
]);

export default router;
