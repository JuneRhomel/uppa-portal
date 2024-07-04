import React from "react";
import TableStyle from "./style/table.style";
import TableComponentParams from "./interface/table_component.params";
import TheadComponentParams from "./interface/thead_component.params";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import TheadStyle from "./style/thead.style";
import TdStyle from "./style/td.style";
import TbodyStyle from "./style/tbody.style";
import ThStyle from "./style/th.style";
import SortIconStyle from "./style/sort_icon.style";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

export function TableComponent({ children }: TableComponentParams) {
  return <TableStyle>{children}</TableStyle>;
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
  columnName,
}: TheadComponentParams) {
  const navigate = useNavigate();
  const location = useLocation();

  const queryPathParameters = new URLSearchParams(location.search);
  const sortBy = queryPathParameters.get("sortBy") ?? "";
  const page = queryPathParameters.get("page") ?? "1";
  const search = queryPathParameters.get("search") ?? "";
  const sortOrder = queryPathParameters.get("sortOrder") ?? "";

  const handleSortBy = (columnName: string) => {
    const newSortOrder = sortOrder === "DESC" ? "ASC" : "DESC";
    navigate(`/properties?page=${page}&sortBy=${columnName}&sortOrder=${newSortOrder}&search=${search}`);
  };

  const renderIcon = () => {
    if (sortBy === columnName) {
      if (sortBy === "DESC") {
        return <ArrowDropUpRoundedIcon fontSize="small"/>;
      } else if (sortBy === "ASC") {
        return <ArrowDropDownRoundedIcon fontSize="small"/>;
      }
    }
    return <SwapVertRoundedIcon  fontSize="small" />;
  };

  if (!isSortTable) return <ThStyle>{children}</ThStyle>;

  return (
    <ThStyle onClick={() => handleSortBy(columnName)}>
      {children}
      <SortIconStyle>{renderIcon()}</SortIconStyle>
    </ThStyle>
  );
}