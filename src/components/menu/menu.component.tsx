import {  Separator } from "@radix-ui/themes";
import React from "react";
import CardComponent from "./component/card.component";
import NavMenuComponent from "./component/nav_menu.component";
import BoxStyleComponent from "./style/box.style";
export default function MenuComponent() {
    return (
        <BoxStyleComponent  >
            <CardComponent />
            <Separator my="3" size="4" />
            <NavMenuComponent />
        </BoxStyleComponent>
    )
}