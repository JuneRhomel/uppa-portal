import React, { useState } from 'react';
import ContainerStyle from "../../../components/container/style/container.style";
import PropertiesTableComponent from "./components/properties_table.component";
import PropertiesTableHeader from "./components/properties_table_header.component";
import ButtonComponent from "../../../components/button/button.component";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CreatePropertiesModalComponent from "./components/create_properties_modal.component";
import { IconButton, Menu, MenuItem, Stack } from '@mui/material';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import TypeSpecimenRoundedIcon from '@mui/icons-material/TypeSpecimenRounded';
import PropertyStatusSettingsModalComponent from './components/property_status_settings_modal.component';
export default function PropertiesContainer() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [statusSettings, setStatusSettings] = useState(false);
  const open = Boolean(anchorEl);
  const handleSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseOption = () => {
    setAnchorEl(null);
  };

  const hadelStatusSettings = () => {
    setStatusSettings(true);
    setAnchorEl(null);
  }
  const hadelCloseStatusSettings = () => {
    setStatusSettings(false);
  }

  return (
    <>
      <ContainerStyle>
        <PropertiesTableHeader>
          <Stack direction="row" spacing={4}>
            <IconButton
              onClick={handleSettings}
            >
              <SettingsRoundedIcon fontSize="small" />
            </IconButton>

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
          </Stack>
        </PropertiesTableHeader>
        <PropertiesTableComponent />


      </ContainerStyle>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseOption}
      >
        <MenuItem color="secondary" onClick={hadelStatusSettings}  sx={{ fontSize: "14px" }}>
          <AutoGraphRoundedIcon color="secondary" fontSize="small" sx={{ mr: 1 }} />
          Property Status Settings
        </MenuItem>
        <MenuItem color="error" sx={{ fontSize: "14px" }} >
          <TypeSpecimenRoundedIcon color="secondary" fontSize="small" sx={{ mr: 1 }} />
          Property Type Settings
        </MenuItem>
      </Menu>

      {openModal && <CreatePropertiesModalComponent isOpen={openModal} handleClose={handleClose} />}
      {statusSettings && <PropertyStatusSettingsModalComponent isOpen={statusSettings} handleClose={hadelCloseStatusSettings} />}
    </>
  );
}
