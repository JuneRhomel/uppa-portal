import React from "react";
import PaginationComponent from "../../../../components/pagination/pagination.component";
import {
  TableComponent,
  TheadComponent,
  TableHeadData,
} from "../../../../components/table/table.component";
import PropertiesTableDataMapper from "./properties_table_data_mapper.component";
import PropertiesTableDataSkeleton from "./properties_table_data_skeleton.compnent";
import PropertyTableParams from "../interface/property_table.params";
export default function PropertiesTableComponent({ propertiesQuery, refetch }: PropertyTableParams) {
  const numberOfRows = propertiesQuery.data?.totalRows ?? 0;
  const properties = propertiesQuery.data?.properties ?? [];

  return (
    <>
      <TableComponent>
        <TheadComponent>
          <tr>
            <TableHeadData columnName="id"># ID</TableHeadData>
            <TableHeadData columnName="unit_name">Property</TableHeadData>
            <TableHeadData columnName="unit_type_name">Type</TableHeadData>
            <TableHeadData columnName="unit_status_name">Status</TableHeadData>
          </tr>
        </TheadComponent>
        {propertiesQuery.isLoading && <PropertiesTableDataSkeleton />}
        <PropertiesTableDataMapper refetch={refetch} properties={properties} />
      </TableComponent>
      <PaginationComponent numberOfRows={10} totalRows={numberOfRows} />
    </>
  );
}
