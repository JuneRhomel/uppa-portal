import { Avatar, Box, Button, Card, Flex, Separator, TabNav, Text } from "@radix-ui/themes";
import React from "react";
import { styleBox } from "./style/box.style";
import CardComponent from "./component/card.component";
import NavMenuComponent from "./component/nav_menu.component";

export default function MenuComponent() {
    return (
        <Box style={styleBox} as="div" >
            <CardComponent />
            <Separator my="3" size="4" />

            <NavMenuComponent />
        </Box>
    )
}