import React from "react";
import HeaderContainerStyle from "./style/header_container.style";
import HeaderIconsBtnStyle from "./style/header_icons_btn.style";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import HeaderContentStyle from "./style/header_content.style";
import HeaderProfileStyle from "./style/header_profile.style";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

export default function HeaderComponent() {
  return (
    <HeaderContainerStyle>
        <HeaderContentStyle>
            <HeaderIconsBtnStyle>
                <NotificationsOutlinedIcon fontSize="small" />
            </HeaderIconsBtnStyle>
            <HeaderIconsBtnStyle>
                <ChatOutlinedIcon fontSize="small" />
            </HeaderIconsBtnStyle>
            <HeaderProfileStyle src="https://i.pravatar.cc/300"/>
        </HeaderContentStyle>
    </HeaderContainerStyle>
  );
}
