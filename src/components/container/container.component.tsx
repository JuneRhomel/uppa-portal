import React from "react";
import ContainerStyle from "./style/container.style";
import ContainerComponentParams from "./interface/container_component.params";

export default function ContainerComponent({ children }: ContainerComponentParams) {
    return <ContainerStyle>{children}</ContainerStyle>;
}