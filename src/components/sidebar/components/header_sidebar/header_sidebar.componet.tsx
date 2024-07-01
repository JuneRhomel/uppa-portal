import React from "react";
import HeaderSidebarContainerStyle from "./style/header_sidebar_container.style";
import HeaderSidebarLogoStyle from "./style/header_sidebar_logo.style";
import HeaderSidebarTitleStyle from "./style/header_sidebar_title.style";

export default function HeaderSidebarComponent() {
  return (
    <HeaderSidebarContainerStyle>
      <HeaderSidebarLogoStyle />
      <HeaderSidebarTitleStyle>
       Uppa
      </HeaderSidebarTitleStyle>
    </HeaderSidebarContainerStyle>
  );
}
