import React from "react";
import PaginationContainerStyle from "./style/pagination_container.style";
import PaginationLabelStyle from "./style/pagination_label.style";
import PaginarionPageContainerStyle from "./style/pagination_page_container.style";
import ButtonComponent from "../button/button.component";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
export default function PaginationComponent() {
  return (
    <PaginationContainerStyle>
      <PaginationLabelStyle>Page 1 of 10</PaginationLabelStyle>
      <PaginarionPageContainerStyle>

        <ButtonComponent sx={{minWidth:30}}   variant={"contained"} size={"small"} type={"button"} >
            <KeyboardArrowLeftRoundedIcon fontSize="small" />
        </ButtonComponent>

        <FormControl sx={{ m: 1, minWidth: 55,height: 30 }}  size="small">
        <InputLabel sx={{ fontSize: "12px" }} >Page</InputLabel>
        <Select sx={{ fontSize: "10px" }}
            value={1}
            label="Page"
        >
            <MenuItem sx={{ fontSize: "10px" }} value={1}>10</MenuItem>
            <MenuItem sx={{ fontSize: "10px" }} value={2}>2</MenuItem>
            <MenuItem sx={{ fontSize: "10px" }} value={3}>3</MenuItem>
        </Select>
        </FormControl>


        <ButtonComponent sx={{minWidth:30}}  variant={"contained"} size={"small"} type={"button"} >
            <KeyboardArrowRightRoundedIcon fontSize="small" />
        </ButtonComponent>

      </PaginarionPageContainerStyle>
    </PaginationContainerStyle>
  );
}
