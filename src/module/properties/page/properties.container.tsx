import React from "react";
import {
  TableComponent,
  TableData,
  TbodyComponent,
  TheadComponent,
  TableHeadData,
} from "../../../components/table/table.component";
import TitleContainer from "../../../components/title/title.container";
import ContainerStyle from "../../../components/container/style/container.style";

export default function PropertiesContainer() {
  return (
    <ContainerStyle>
      <TitleContainer> Properties </TitleContainer>

      <TableComponent>
        <TheadComponent>
          <TableHeadData>First Name</TableHeadData>
          <TableHeadData>Last Name</TableHeadData>
          <TableHeadData>Email</TableHeadData>
          <TableHeadData>Status</TableHeadData>
          <TableHeadData isSortTable={false}>Action</TableHeadData>
        </TheadComponent>

        <TbodyComponent>
          <TableData>June Rhomel</TableData>
          <TableData>Mandigma</TableData>
          <TableData>junemandigma@gmail.com</TableData>
          <TableData>Active</TableData>
          <TableData>Test</TableData>
        </TbodyComponent>

        <TbodyComponent>
          <TableData>Jhon</TableData>
          <TableData>Doe</TableData>
          <TableData>johndoe@gmail.com</TableData>
          <TableData>Active</TableData>
          <TableData>Test</TableData>
        </TbodyComponent>

        <TbodyComponent>
          <TableData>Bob</TableData>
          <TableData>Doe</TableData>
          <TableData>bobdoe@gmail.com</TableData>
          <TableData>Active</TableData>
          <TableData>Test</TableData>
        </TbodyComponent>
      </TableComponent>
    </ContainerStyle>
  );
}
