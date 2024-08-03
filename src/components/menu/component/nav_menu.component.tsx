import { Text, Flex, Tooltip, Separator, Box } from "@radix-ui/themes";
import React from "react";
import NavMenuStyle from "../style/nav_menu.style";
import { DashboardIcon, ListBulletIcon, AvatarIcon, LayoutIcon, HomeIcon, BackpackIcon, ActivityLogIcon, IdCardIcon, TimerIcon } from '@radix-ui/react-icons'
import { useLocation, useNavigate } from "react-router-dom";

export default function NavMenuComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const handelClick = (where: string) => {
        navigate(`/${where}`);
    }
    const isActive = (where: string) => {
        const firstpath = pathname.split("/")[1];
        return pathname === `/${firstpath}`;
    }

    return (
        <Flex direction={"column"} gap="2">
            <Tooltip side="right" content="Dashboard">
                <NavMenuStyle onClick={() => handelClick("")} className={pathname === "/" ? "active" : ""}>
                    <DashboardIcon />
                    <Text as="div" size="2">Dashborad</Text>
                </NavMenuStyle>
            </Tooltip>
            <Box mt={'4'} mb={'2'}>
                <Text size={"2"} mb={'0'} weight={"medium"}>Property Management</Text>

            </Box>
            <Tooltip side="right" content="Properties">
                <NavMenuStyle >
                    <HomeIcon />
                    <Text as="div" size="2">Propertiesn Overview</Text>
                </NavMenuStyle>
            </Tooltip>
            <Tooltip side="right" content="Properties">
                <NavMenuStyle onClick={() => handelClick("properties")} className={pathname === "/properties" ? "active" : ""}>
                    <HomeIcon />
                    <Text as="div" size="2">Property Listings</Text>
                </NavMenuStyle>
            </Tooltip>
            <Tooltip side="right" content="Properties Tenants">
                <NavMenuStyle onClick={() => handelClick("manage-properties")} className={pathname === "/manage-properties" ? "active" : ""}>
                    <BackpackIcon />
                    <Text as="div" size="2">Manage Properties</Text>
                </NavMenuStyle>
            </Tooltip>
            <Box mt={'4'} mb={'2'}>
                <Text size={"2"} mb={'0'} weight={"medium"}>Tenant Management</Text>
            </Box>
            <Tooltip side="right" content="Tenants">
                <NavMenuStyle onClick={() => handelClick("tenants")} className={pathname === "/tenants" ? "active" : ""}>
                    <AvatarIcon />
                    <Text as="div" size="2">Tenant Directory</Text>
                </NavMenuStyle>
            </Tooltip>
            <Tooltip side="right" content="Manage Tenants">
                <NavMenuStyle className={pathname === "/manage-tenants" ? "active" : ""}>
                    <IdCardIcon />
                    <Text as="div" size="2">Manage Tenants</Text>
                </NavMenuStyle>
            </Tooltip>
            <Box mt={'4'} mb={'2'}>
                <Text size={"2"} mb={'0'} weight={"medium"}>Utility Management</Text>
            </Box>
            <Tooltip side="right" content="Mother Meter">
                <NavMenuStyle onClick={() => handelClick("mother-meter/water")} className={pathname === "/mother-meter/water" ? "active" : ""}>
                    <TimerIcon />
                    <Text as="div" size="2">Mother Meter</Text>
                </NavMenuStyle>
            </Tooltip>
        </Flex>
    )
}