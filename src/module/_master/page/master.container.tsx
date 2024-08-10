import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import MasterContainerStyle from "./style/master_container.style";
import MenuComponent from "../../../components/menu/menu.component";
import MasterContentStyle from "./style/master_content.style";
import MasterMainStyle from "./style/master_main.style";
import HeaderComponent from "../../../components/header/header.component";

export default function MasterContainer() {
  const token = localStorage.getItem("token");

  const renderToLogin = () => <Navigate to={"/login"} />;

  const renderMasterContainer = () => (
    <MasterContainerStyle>
      <MenuComponent />
      <MasterContentStyle>
        <HeaderComponent />
        <MasterMainStyle>

          <Outlet />
        </MasterMainStyle>
      </MasterContentStyle>
    </MasterContainerStyle>
  );

  return token === null ? renderToLogin() : renderMasterContainer();
}
