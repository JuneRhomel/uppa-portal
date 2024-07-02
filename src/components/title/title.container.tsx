import React from "react";
import TitleContainerParams from "./interface/title_container.params";
import TitleContainerStyle from "./style/title_container.style";

export default function TitleContainer({ children }: TitleContainerParams) {
    return <TitleContainerStyle>{children}</TitleContainerStyle>;
}