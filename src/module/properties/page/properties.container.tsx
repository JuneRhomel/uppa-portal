import React, { useState } from 'react';
import ContainerStyle from "../../../components/container/style/container.style";
import PropertiesTableComponent from "./components/properties_table.component";
import PropertiesTableHeader from "./components/properties_table_header.component";
import ButtonComponent from "../../../components/button/button.component";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CreatePropertiesModalComponent from "./components/create_properties_modal.component";
import { Autocomplete, Box, Button, IconButton, Menu, MenuItem, Stack, TextField } from '@mui/material';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import TypeSpecimenRoundedIcon from '@mui/icons-material/TypeSpecimenRounded';
import PropertyStatusSettingsModalComponent from './components/property_status_settings_modal.component';
import PropertyTypeSettingsModalComponent from './components/property_type_settings_model.component';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import FilterTableComponent from './components/filter_table.component';

export default function PropertiesContainer() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [propertySettingsShow, setpropertySettingsShow] = useState<null | HTMLElement>(null);

  const [statusSettings, setStatusSettings] = useState(false);

  const [typeSettings, setTypeSettings] = useState(false);

  const [filter, setFilter] = useState(false);

  const open = Boolean(propertySettingsShow);
  const handleSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setpropertySettingsShow(event.currentTarget);
  };
  const handleCloseOption = () => {
    setpropertySettingsShow(null);
  };

  const hadelStatusSettings = () => {
    setStatusSettings(true);
    setpropertySettingsShow(null);
  }
  const hadelTypeSettings = () => {
    setTypeSettings(true);
    setpropertySettingsShow(null);
  }
  const hadelCloseStatusSettings = () => {
    setStatusSettings(false);
  }
  const hadelCloseTypeSettings = () => {
    setTypeSettings(false);
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

            <Button onClick={() => setFilter(!filter)}
            size="medium" style={{ gap: "5px" }} >
              <TuneRoundedIcon fontSize="small" /> Filter
            </Button>

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

         <FilterTableComponent isOpen={filter} />

        <PropertiesTableComponent />
      </ContainerStyle>

      <Menu
        anchorEl={propertySettingsShow}
        open={open}
        onClose={handleCloseOption}
      >
        <MenuItem color="secondary" onClick={hadelStatusSettings} sx={{ fontSize: "14px" }}>
          <AutoGraphRoundedIcon color="secondary" fontSize="small" sx={{ mr: 1 }} />
          Property Status Settings
        </MenuItem>
        <MenuItem color="error" sx={{ fontSize: "14px" }} onClick={hadelTypeSettings} >
          <TypeSpecimenRoundedIcon color="secondary" fontSize="small" sx={{ mr: 1 }} />
          Property Type Settings
        </MenuItem>
      </Menu>

      {openModal && <CreatePropertiesModalComponent isOpen={openModal} handleClose={handleClose} />}
      {statusSettings && <PropertyStatusSettingsModalComponent isOpen={statusSettings} handleClose={hadelCloseStatusSettings} />}
      {typeSettings && <PropertyTypeSettingsModalComponent isOpen={typeSettings} handleClose={hadelCloseTypeSettings} />}
    </>
  );
}
