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
import PreopertyView from "../../module/properties/view/preoperty.view";
import TenantView from "../../module/tenant/page/view/tenant.vew";
import MotherMeterWaterView from "../../module/mother_meter/view/mother_meter_water/mother_meter_water.view";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MasterContainer />,
    children: [
      {
        index: true,
        element: <DashboardContainer />,
      },
      {
        path: "properties",
        children: [
          {
            index: true,
            element: <PropertiesContainer />,
          },
          {
            path: ":id",
            element: <PreopertyView />,
          }
        ]
      },
      {
        path: "manage-properties",
        element: <ManagePropertyContainer />,
      },
      {
        path: "tenant",
        children: [
          {
            index: true,
            element: <TenantContainer />,
          },
          {
            path: ":id",
            element: <TenantView />,
          },
        ]
      },
      {
        path: "mother-meter/water",
        children: [
          {
            index: true,
            element: <MotherMeterWaterContainer />,
          },
          {
            path: ":id",
            element: <MotherMeterWaterView />,
          },
        ]
      },
      {
        path: "mother-meter/electricity",
        children: [
          {
            index: true,
            element: <MotherMeterElectricityContainer />,
          },
          {
            path: ":id",
            element: <MotherMeterElectricityContainer />,
          },
        ]
      }
    ],
  },
  {
    path: "/login",
    element: <LoginContainer />,
  },
]);

export default router;
