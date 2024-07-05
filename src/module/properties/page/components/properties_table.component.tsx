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
} from "../../../../components/table/table.component";
import PropertiesTableHeader from "./properties_table_header";
import { plainToInstance } from "class-transformer";
import PaginationEntity from "../../../../application/entity/pagination.entity";
import PropertiesTableDataMapper from "./properties_table_data_mapper";
import Failure from "../../../../application/failure/failure";
import PropertiesEntity from "../../domain/entity/properties.entity";
import ListPropertiesEntity from "../../domain/entity/list_properties.entity";
import PropertiesTableDataSkeleton from "./properties_table_data_skeleton";

export default function PropertiesTableComponent() {
  const location = useLocation();

  const queryPathParameters = new URLSearchParams(location.search);
  const sortBy = queryPathParameters.get("sortBy") ?? "id";
  const page = queryPathParameters.get("page") ?? "1";
  const search = queryPathParameters.get("search") ?? "";
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
    });

    const response = await PropertiesUseCase({
      paginationEntity,
    });

    if (response instanceof Failure) {
      alert(response.message);
    }
    return response as ListPropertiesEntity;
  };

  const propertiesQuery = useQuery({
    queryKey: ["properties", search, page, columns, sortBy, sortOrder],
    queryFn: fetchProperties,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const numberOfRows =  propertiesQuery.data?.totalRows ?? 0;
  const properties = propertiesQuery.data?.properties ?? [];

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
        {propertiesQuery.isLoading && <PropertiesTableDataSkeleton />}
            <PropertiesTableDataMapper  property={properties} />
      </TableComponent>
      <PaginationComponent numberOfRows={10} totalRows={numberOfRows} />
    </>
  );
}
