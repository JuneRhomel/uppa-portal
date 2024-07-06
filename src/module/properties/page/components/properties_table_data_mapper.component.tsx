import React from "react";
import {
  TableData,
  TableRowComponent,
  TbodyComponent,
} from "../../../../components/table/table.component";
import PropertiesTableDataMapperParams from "../interface/properties_table_data_mapper.params";
export default function PropertiesTableDataMapper({
  property,
}: PropertiesTableDataMapperParams) {
  return (
    <TbodyComponent>
      {property.map((item) => (
        <TableRowComponent key={item.id}>
          <TableData>{item.id}</TableData>
          <TableData>{item.unit_name}</TableData>
          <TableData>{item.unit_type_name}</TableData>
          <TableData>{item.unit_status_name}</TableData>
          <TableData>Action</TableData>
        </TableRowComponent>
      ))}
    </TbodyComponent>
  );
}
