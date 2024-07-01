import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import SidebarComponent from "../../../components/sidebar/sidebar.component";
import MasterContainerStyle from "./style/master_container.style";

export default function MasterContainer() {
  const token = localStorage.getItem("token");

  const renderToLogin = () => <Navigate to={"/login"} />;

  const renderMasterContainer = () => (
    <MasterContainerStyle>
      <SidebarComponent />
      <Outlet />
    </MasterContainerStyle>
  );

  return token === null ? renderToLogin() : renderMasterContainer();
}
