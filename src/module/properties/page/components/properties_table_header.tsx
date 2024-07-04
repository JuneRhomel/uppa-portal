import React from "react";
import ButtonComponent from "../../../../components/button/button.component";
import TableHeaderComponent from "../../../../components/table_header/table_header.component";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export default function PropertiesTableHeader() {
  return (
    <TableHeaderComponent>
      <ButtonComponent
        variant="contained"
        size="medium"
        style={{ textTransform: "none" }}
        isLoading={false}
        type={"button"}
      >
        <AddRoundedIcon fontSize="small" style={{ marginRight: "5px" }} />
        Add Property
      </ButtonComponent>
    </TableHeaderComponent>
  );
}
