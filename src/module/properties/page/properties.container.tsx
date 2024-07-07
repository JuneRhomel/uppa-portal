import React, { useState } from 'react';
import ContainerStyle from "../../../components/container/style/container.style";
import PropertiesTableComponent from "./components/properties_table.component";
import PropertiesTableHeader from "./components/properties_table_header.component";
import ButtonComponent from "../../../components/button/button.component";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CreatePropertiesModalComponent from "./components/create_properties_modal.component";
export default function PropertiesContainer() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ContainerStyle>
        <PropertiesTableHeader>
          <ButtonComponent
            variant="contained"
            size="medium"
            style={{ textTransform: "none" }}
            isLoading={false}
            type={"button"}
            onClick={handleOpen}
          >
            <AddRoundedIcon fontSize="small" style={{ marginRight: "5px" }} />
            Add Property
          </ButtonComponent>
        </PropertiesTableHeader>
        <PropertiesTableComponent />
      
        {open && <CreatePropertiesModalComponent isOpen={open} handleClose={handleClose} />}

      </ContainerStyle>
    </>
  );
}
