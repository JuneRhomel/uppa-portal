import React from "react";
import MainMenuSidebarContainerStyle from "./style/main_menu_container.style";
import MainMenuComponentParams from "./interface/main_menu_component.params";
import { useNavigate } from "react-router-dom";
export default function MainMenuComponent({
  children,
  to,
  isActive,
}: MainMenuComponentParams) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <MainMenuSidebarContainerStyle $isactive={isActive} onClick={handleClick}>
      {children}
    </MainMenuSidebarContainerStyle>
  );
}
