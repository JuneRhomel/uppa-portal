import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import SidebarComponent from "../../../components/sidebar/sidebar.component";
import MasterContainerStyle from "./style/master_container.style";
import HeaderComponent from "../../../components/header/header.component";
import MasterContentStyle from "./style/master_content.style";
import MasterMainStyle from "./style/master_main.style";

export default function MasterContainer() {
  const token = localStorage.getItem("token");

  const renderToLogin = () => <Navigate to={"/login"} />;

  const renderMasterContainer = () => (
    <MasterContainerStyle>
      <SidebarComponent />
      <MasterContentStyle>
        <HeaderComponent/>
        <MasterMainStyle>

        <Outlet />
        </MasterMainStyle>
      </MasterContentStyle>
    </MasterContainerStyle>
  );

  return token === null ? renderToLogin() : renderMasterContainer();
}
