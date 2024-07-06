import React from "react";
import TableHeaderComponent from "../../../../components/table_header/table_header.component";
import PropertiesTableHeaderParams from "../interface/properties_table_header.params";
export default function PropertiesTableHeader({
  children,
}: PropertiesTableHeaderParams) {
  return (
    <TableHeaderComponent>
      {children}
    </TableHeaderComponent>
  );
}
