import React from "react";
import SidebarContainerStyle from "./style/sidebar_container.style";
import HeaderSidebarComponent from "./components/header_sidebar/header_sidebar.componet";
import MainMenuComponent from "./components/main_menu/main_menu.component";
import SidebarMenuContainerStyle from "./style/sidebar_menu_container.style";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { useLocation } from "react-router-dom";
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
export default function SidebarComponent() {
  const location = useLocation();

  const menuList = [
    { title: "Dashboard", icon: <DashboardOutlinedIcon />, url: "/" },
    { title: "Properties", icon: <HomeWorkOutlinedIcon />, url: "/properties" },
    { title: "Tenants", icon: <SupervisedUserCircleRoundedIcon />, url: "/tenants" },
  ];

  const renderMenuList = () => {
    return menuList.map((menu) => {
      return (
        <MainMenuComponent
          key={menu.title}
          to={menu.url}
          isActive={location.pathname === menu.url}
        >
          {menu.icon}
          {menu.title}
        </MainMenuComponent>
      );
    });
  };


  return (
    <SidebarContainerStyle>
      <HeaderSidebarComponent />
      <SidebarMenuContainerStyle>
        {renderMenuList()}
      </SidebarMenuContainerStyle>
    </SidebarContainerStyle>
  );
}
