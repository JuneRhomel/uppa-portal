import { Text, Flex, Tooltip } from "@radix-ui/themes";
import React, { useEffect } from "react";
import NavMenuStyle from "../style/nav_menu.style";
import { DashboardIcon, ListBulletIcon, AvatarIcon } from '@radix-ui/react-icons'
import { useLocation, useNavigate } from "react-router-dom";

export default function NavMenuComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const handelClick = (where: string) => {
        navigate(`/${where}`);
    }

    return (
        <Flex direction={"column"} gap="1">
            <Tooltip side="right" content="Dashboard">
                <NavMenuStyle onClick={() => handelClick("")} className={pathname === "/" ? "active" : ""}>
                    <DashboardIcon />
                    <Text as="div" size="2">Dashborad</Text>
                </NavMenuStyle>
            </Tooltip>
            <Tooltip side="right" content="Properties">
                <NavMenuStyle onClick={() => handelClick("properties")} className={pathname === "/properties" ? "active" : ""}>
                    <ListBulletIcon />
                    <Text as="div" size="2">Properties</Text>
                </NavMenuStyle>
            </Tooltip>
            <Tooltip side="right" content="Tenants">
                <NavMenuStyle onClick={() => handelClick("tenants")} className={pathname === "/tenants" ? "active" : ""}>
                    <AvatarIcon />
                    <Text as="div" size="2">Tenants</Text>
                </NavMenuStyle>
            </Tooltip>
        </Flex>
    )
}