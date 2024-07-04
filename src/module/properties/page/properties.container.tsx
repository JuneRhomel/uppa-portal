import React from "react";
import TitleContainer from "../../../components/title/title.container";
import ContainerStyle from "../../../components/container/style/container.style";
import PropertiesTableComponent from "./components/properties_table.component";

export default function PropertiesContainer() {
  return (
    <>
      <TitleContainer> Properties </TitleContainer>
      <ContainerStyle>
        <PropertiesTableComponent />
      </ContainerStyle>
    </>
  );
}
