import { Text, Flex, Tooltip, Separator, Box } from "@radix-ui/themes";
import React from "react";
import NavMenuStyle from "../style/nav_menu.style";
import { DashboardIcon, ListBulletIcon, AvatarIcon, LayoutIcon, HomeIcon, BackpackIcon, ActivityLogIcon, IdCardIcon, TimerIcon } from '@radix-ui/react-icons'
import { useLocation, useNavigate } from "react-router-dom";
import { BsSpeedometer2, BsSpeedometer } from "react-icons/bs";
import { BiBuildings } from "react-icons/bi";
import { FaBuildingUser } from "react-icons/fa6";
import { LuBuilding2 } from "react-icons/lu";
import { FaUsers,FaUsersGear } from "react-icons/fa6";

export default function NavMenuComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const handelClick = (where: string) => {
        navigate(`/${where}`);
    }
    const isActive = (where: string) => {
        const firstpath = pathname.split("/")[1];
        const activePath = where.split("/")[1];
        if (activePath === firstpath) {
            return "active"
        }
        return ""
    }

    return (
        <Flex direction={"column"} gap="2">
            <Tooltip side="right" content="Dashboard">
                <NavMenuStyle onClick={() => handelClick("")} className={isActive("/")}>
                    <DashboardIcon />
                    <Text as="div" size="2">Dashborad</Text>
                </NavMenuStyle>
            </Tooltip>
            <Box mt={'4'} mb={'2'}>
                <Text size={"2"} mb={'0'} weight={"medium"}>Property Management</Text>
            </Box>
            <Tooltip side="right" content="Properties">
                <NavMenuStyle >
                    <LuBuilding2 />
                    <Text as="div" size="2">Propertiesn Overview</Text>
                </NavMenuStyle>
            </Tooltip>
            <Tooltip side="right" content="Properties">
                <NavMenuStyle onClick={() => handelClick("properties")} className={isActive("/properties")}>
                <BiBuildings />
                    <Text as="div" size="2">Property Listings</Text>
                </NavMenuStyle>
            </Tooltip>
            <Tooltip side="right" content="Properties Tenants">
                <NavMenuStyle onClick={() => handelClick("manage-properties")} className={isActive("/manage-properties")}>
                    <FaBuildingUser />
                    <Text as="div" size="2">Manage Properties</Text>
                </NavMenuStyle>
            </Tooltip>
            <Box mt={'4'} mb={'2'}>
                <Text size={"2"} mb={'0'} weight={"medium"}>Tenant Management</Text>
            </Box>
            <Tooltip side="right" content="Tenants">
                <NavMenuStyle onClick={() => handelClick("tenants")} className={isActive("/tenants")}>
                    <FaUsers />
                    <Text as="div" size="2">Tenant Directory</Text>
                </NavMenuStyle>
            </Tooltip>
            <Tooltip side="right" content="Manage Tenants">
                <NavMenuStyle className={isActive("/manage-tenants")}>
                    <FaUsersGear />
                    <Text as="div" size="2">Manage Tenants</Text>
                </NavMenuStyle>
            </Tooltip>
            <Box mt={'4'} mb={'2'}>
                <Text size={"2"} mb={'0'} weight={"medium"}>Utility Management</Text>
            </Box>
            <Tooltip side="right" content="Mother Meter">
                <NavMenuStyle onClick={() => handelClick("mother-meter/water")} className={isActive("/mother-meter/water")}>
                    <BsSpeedometer />
                    <Text as="div" size="2">Mother Meter</Text>
                </NavMenuStyle>
            </Tooltip>
            <Tooltip side="right" content="Sub Meter">
                <NavMenuStyle onClick={() => handelClick("sub-meter/water")} className={isActive("/sub-meter/water")}>
                    <BsSpeedometer2 />
                    <Text as="div" size="2">Sub Meter</Text>
                </NavMenuStyle>
            </Tooltip>
        </Flex>
    )
}