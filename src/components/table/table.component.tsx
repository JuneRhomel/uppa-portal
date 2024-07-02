import React from "react";
import TableStyle from "./style/table.style";
import TableComponentParams from "./interface/table_component.params";
import TheadComponentParams from "./interface/thead_component.params";
import TableContainerStyle from "./style/table_container.style";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import TheadStyle from "./style/thead.style";
import TdStyle from "./style/td.style";
import TbodyStyle from "./style/tbody.style";
import ThStyle from "./style/th.style";
import SortIconStyle from "./style/sort_icon.style";
import PaginationComponent from "../pagination/pagination.component";


export function TableComponent({ children }: TableComponentParams) {
  return (
    <>
      <TableStyle>{children}</TableStyle>
      <PaginationComponent />
    </>
  );
}

export function TheadComponent({ children }: TableComponentParams) {
  return <TheadStyle>{children}</TheadStyle>;
}

export function TbodyComponent({ children }: TableComponentParams) {
  return <TbodyStyle>{children}</TbodyStyle>;
}

export function TableData({ children }: TableComponentParams) {
  return <TdStyle>{children}</TdStyle>;
}
export function TableHeadData({
  children,
  isSortTable = true,
}: TheadComponentParams) {
  if (!isSortTable) return <ThStyle>{children}</ThStyle>;
  return (
    <ThStyle>
      {children}
      <SortIconStyle>
      <SwapVertRoundedIcon fontSize="small" />
      </SortIconStyle>
    </ThStyle>
  );
}

