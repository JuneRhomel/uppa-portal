import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaginationContainerStyle from "./style/pagination_container.style";
import PaginationLabelStyle from "./style/pagination_label.style";
import PaginarionPageContainerStyle from "./style/pagination_page_container.style";
import ButtonComponent from "../button/button.component";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import PaginationComponentParams from "./interface/pagination_component.params";
import { SelectChangeEvent } from "@mui/material/Select";
export default function PaginationComponent({
  numberOfRows,
  totalRows,
}: PaginationComponentParams) {
  const navigate = useNavigate();
  const location = useLocation();
  const totalPages = Math.ceil(totalRows / numberOfRows);

  const queryPathParameters = new URLSearchParams(location.search);
  const sortOrder = queryPathParameters.get("sortOrder") ?? "";
  const page = queryPathParameters.get("page") ?? "1";
  const search = queryPathParameters.get("search") ?? "";
  const sortBy = queryPathParameters.get("sortBy") ?? "";

  const handleDropdownChange = (event: SelectChangeEvent) => {
    const tagetPage = Number(event.target.value) || 1;
    navigate(`/properties?page=${tagetPage}&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}`);
  };

  const nextPage = () => {
    if (Number(page) < totalPages) {
      navigate(`/properties?page=${Number(page) + 1}&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}`);
    }
  };

  const previousPage = () => {
    if (Number(page) > 1) {
      navigate(`/properties?page=${Number(page) - 1}&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}`);
    }
  };
  return (
    <PaginationContainerStyle>
      <PaginationLabelStyle>Page {page} of {totalPages}</PaginationLabelStyle>
      <PaginarionPageContainerStyle>
        <ButtonComponent
          onClick={previousPage}
          sx={{ minWidth: 30 }}
          variant={"contained"}
          size={"small"}
          type={"button"}
        >
          <KeyboardArrowLeftRoundedIcon fontSize="small" />
        </ButtonComponent>

        <FormControl sx={{ m: 1, minWidth: 55, height: 30 }} size="small">
          <InputLabel sx={{ fontSize: "12px" }}>Page</InputLabel>
          <Select
            sx={{ fontSize: "10px" }}
            value={page}
            label="Page"
            onChange={handleDropdownChange}
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <MenuItem
                key={index + 1}
                sx={{ fontSize: "10px" }}
                value={index + 1}
              >
                {index + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ButtonComponent
          onClick={nextPage}
          sx={{ minWidth: 30 }}
          variant={"contained"}
          size={"small"}
          type={"button"}
        >
          <KeyboardArrowRightRoundedIcon fontSize="small" />
        </ButtonComponent>
      </PaginarionPageContainerStyle>
    </PaginationContainerStyle>
  );
}
