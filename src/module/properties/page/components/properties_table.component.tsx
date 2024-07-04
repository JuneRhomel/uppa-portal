import React from "react";
import { useLocation } from "react-router-dom";
import PaginationComponent from "../../../../components/pagination/pagination.component";
import { useQuery } from "@tanstack/react-query";
import PropertiesUseCase from "../../domain/use_case/properties.use_case";
import {
  TableComponent,
  TheadComponent,
  TableHeadData,
  TbodyComponent,
  TableData,
} from "../../../../components/table/table.component";
import PropertiesTableHeader from "./properties_table_header";
import { plainToInstance } from "class-transformer";
import PaginationEntity from "../../../../application/entity/pagination.entity";

export default function PropertiesTableComponent() {
  const location = useLocation();

  const queryPathParameters = new URLSearchParams(location.search);
  const sortBy = queryPathParameters.get("sortBy") ?? "id";
  const page = queryPathParameters.get("page") ?? "1";
  const search = queryPathParameters.get("search") ?? "";
  const filters = queryPathParameters.get("filters") ?? "";
  const sortOrder = queryPathParameters.get("sortOrder") ?? "ASC";

  const columns = "unit_name,unit_type_name,unit_status_name";
  const fetchProperties = async () => {
    const paginationEntity = plainToInstance(PaginationEntity, {
      numberOfRows: 10,
      page: parseInt(page, 10),
      columns,
      sortBy,
      sortOrder,
      search,
      filters,
    });

    const response = await PropertiesUseCase({
      paginationEntity,
    });

    return response;
  };

  const propertiesQuery = useQuery({
    queryKey: ["properties", search, page, columns, sortBy, filters],
    queryFn: fetchProperties,
    retry: false,
    refetchOnWindowFocus: false,
  });

  console.log(propertiesQuery.isLoading);

  return (
    <>
      <PropertiesTableHeader />
      <TableComponent>
        <TheadComponent>
          <tr>
            <TableHeadData columnName="id"># ID</TableHeadData>
            <TableHeadData columnName="unit_name">Property</TableHeadData>
            <TableHeadData columnName="unit_type_name">Type</TableHeadData>
            <TableHeadData columnName="unit_status_name">Status</TableHeadData>
            <TableHeadData columnName="action" isSortTable={false}>
              Action
            </TableHeadData>
          </tr>
        </TheadComponent>

        <TbodyComponent>
          <tr>
            <TableData>June Rhomel</TableData>
            <TableData>Mandigma</TableData>
            <TableData>junemandigma@gmail.com</TableData>
            <TableData>Active</TableData>
            <TableData>Test</TableData>
          </tr>
        </TbodyComponent>
        <TbodyComponent>
          <tr>
            <TableData>June Rhomel</TableData>
            <TableData>Mandigma</TableData>
            <TableData>junemandigma@gmail.com</TableData>
            <TableData>Active</TableData>
            <TableData>Test</TableData>
          </tr>
        </TbodyComponent>
      </TableComponent>
      <PaginationComponent numberOfRows={10} totalRows={100} />
    </>
  );
}
