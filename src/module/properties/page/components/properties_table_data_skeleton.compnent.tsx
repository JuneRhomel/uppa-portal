import React from "react";
import {
  TableRowComponent,
  TableData,
  TbodyComponent,
} from "../../../../components/table/table.component";
import { Skeleton } from "@mui/material";

export default function PropertiesTableDataSkeleton() {
  return (
    <TbodyComponent>
      {Array.from(Array(10).keys()).map((item) => (
        <TableRowComponent key={item}>
          <TableData>
            <Skeleton />
          </TableData>
          <TableData>
            <Skeleton />
          </TableData>
          <TableData>
            <Skeleton />
          </TableData>
          <TableData>
            <Skeleton />
          </TableData>
        </TableRowComponent>
      ))}
    </TbodyComponent>
  );
}
