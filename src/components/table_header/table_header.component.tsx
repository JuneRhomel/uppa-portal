import React from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import TableHeaderStyle from "./style/table_header_component.style";
import TabeSerchContainerStyle from "./style/table_search_container.style";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TableHeaderParams from "./interface/table_header_component.params";

export default function TableHeaderComponent({ children }: TableHeaderParams) {
  const navigate = useNavigate();
  const location = useLocation();

  const queryPathParameters = new URLSearchParams(location.search);
  const columns = queryPathParameters.get("columns") ?? "";
  const sortBy = queryPathParameters.get("sortBy") ?? "";
  const sortOrder = queryPathParameters.get("sortOrder") ?? "";
  const page = queryPathParameters.get("page") ?? "1";
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    navigate(
      `/properties?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}&columns=${columns}&search=${search}`
    );
  };

  return (
    <TableHeaderStyle>
      <TabeSerchContainerStyle>
        <TextField
          size="small"
          label="Search"
          variant="outlined"
          color="primary"
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SearchRoundedIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </TabeSerchContainerStyle>
      <div>
        {children}
      </div>
    </TableHeaderStyle>
  );
}
