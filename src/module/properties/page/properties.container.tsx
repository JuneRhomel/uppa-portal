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
import PaginationComponent from "../../../components/pagination/pagination.component";
import TableHeaderComponent from "../../../components/table_header/table_header.component";
import ButtonComponent from "../../../components/button/button.component";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
export default function PropertiesContainer() {
  return (
    <>
      <TitleContainer> Properties </TitleContainer>
    <ContainerStyle>
      <TableHeaderComponent>
        <ButtonComponent
          variant="contained"
          size="medium"
          style={{ textTransform: "none" }}
          isLoading={false}
          type={"button"}
        >
          <AddRoundedIcon fontSize="small" style={{ marginRight: "5px" }} />
          Add Property
        </ButtonComponent>
      </TableHeaderComponent>
      <TableComponent>
        <TheadComponent>
          <TableHeadData columnName="firstName">First Name</TableHeadData>
          <TableHeadData columnName="lastName">Last Name</TableHeadData>
          <TableHeadData columnName="email">Email</TableHeadData>
          <TableHeadData columnName="status">Status</TableHeadData>
          <TableHeadData columnName="action" isSortTable={false}>
            Action
          </TableHeadData>
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
      <PaginationComponent numberOfRows={10} totalRows={100} />
    </ContainerStyle>
    </>
  );
}
