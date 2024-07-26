import React, { useState } from 'react';
import { motion } from "framer-motion"
import ContainerStyle from "../../../components/container/style/container.style";
import PropertiesTableComponent from "./components/properties_table.component";
import PropertiesTableHeader from "./components/properties_table_header.component";
import ButtonComponent from "../../../components/button/button.component";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CreatePropertiesModalComponent from "./components/create_properties_modal.component";
import { Box, Button, IconButton, Menu, MenuItem, Stack, TextField } from '@mui/material';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import TypeSpecimenRoundedIcon from '@mui/icons-material/TypeSpecimenRounded';
import PropertyStatusSettingsModalComponent from './components/property_status_settings_modal.component';
import PropertyTypeSettingsModalComponent from './components/property_type_settings_model.component';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import FilterTableComponent from './components/filter_table.component';
import { useQuery } from '@tanstack/react-query';
import ListPropertiesEntity from '../domain/entity/list_properties.entity';
import TimeoutFailure from '../../../application/failure/timeout.failure';
import PropertiesUseCase from '../domain/use_case/properties.use_case';
import PaginationEntity from '../../../application/entity/pagination.entity';
import { plainToInstance } from 'class-transformer';
import { useNavigate } from 'react-router-dom';
import Failure from '../../../application/failure/failure';

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


  const navigate = useNavigate();
  const queryPathParameters = new URLSearchParams(location.search);
  const sortBy = queryPathParameters.get("sortBy") ?? "id";
  const page = queryPathParameters.get("page") ?? "1";
  const search = queryPathParameters.get("search") ?? "";
  const sortOrder = queryPathParameters.get("sortOrder") ?? "DESC";
  const filters = queryPathParameters.get("filters") ?? "";

  const columns = "unit_name,unit_type_name,unit_status_name";
  const fetchProperties = async () => {
    const paginationEntity = plainToInstance(PaginationEntity, {
      numberOfRows: 10,
      page: parseInt(page, 10),
      columns,
      sortBy,
      sortOrder,
      search,
      filters,
    });

    const response = await PropertiesUseCase({
      paginationEntity,
    });

    if (response instanceof TimeoutFailure) {
      alert("Your session has expired. Please login again.");
      return navigate("/login");
    }
    if (response instanceof Failure) {
      alert(response.message);
    }
    return response as ListPropertiesEntity;
  };

  const propertiesQuery = useQuery({
    queryKey: ["properties", search, page, columns, sortBy, sortOrder, filters],
    queryFn: fetchProperties,
    retry: true,
    refetchOnWindowFocus: true,
  });


  const refetch = () => propertiesQuery.refetch();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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

        <PropertiesTableComponent refetch={refetch} propertiesQuery={propertiesQuery} />
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

      {openModal && <CreatePropertiesModalComponent refetch={refetch} isOpen={openModal} handleClose={handleClose} />}
      {statusSettings && <PropertyStatusSettingsModalComponent refetch={refetch} isOpen={statusSettings} handleClose={hadelCloseStatusSettings} />}
      {typeSettings && <PropertyTypeSettingsModalComponent refetch={refetch} isOpen={typeSettings} handleClose={hadelCloseTypeSettings} />}
    </motion.div>
  );
}
