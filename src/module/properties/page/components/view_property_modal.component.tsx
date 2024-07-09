import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Fab from '@mui/material/Fab';
import Box from "@mui/material/Box";
import GetPropertyUseCase from "../../domain/use_case/get_property.use_case";
import PropertiesEntity from "../../domain/entity/properties.entity";
import ViewPropertyParams from "../interface/view_property.params";
import Chip from '@mui/material/Chip';
import { IconButton, Stack, Typography } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ViewPropertyModalLoadingComponent from "./view_property_model_loading.component";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditPropertyModalComponent from "./edit_property_modal.componet";
export default function ViewPropertyModalComponent({ id, isShow = false, handleClose }: ViewPropertyParams) {
    const [property, setProperty] = useState({} as PropertiesEntity);
    const [isLoading, setIsLoading] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "500px",
        bgcolor: "background.paper",
        border: "2px solid #e0e0e0;",
        borderRadius: "4px",
        boxShadow: 24,
        p: 2,
    };

    const fetchProperty = async (id) => {
        const response = await GetPropertyUseCase({ id }) as PropertiesEntity;
        setProperty(response);

        setIsLoading(false);
    }

    useEffect(() => {
        fetchProperty(id);
        const intervalId = setInterval(() => fetchProperty(id), 3000);

        return () => clearInterval(intervalId);
    }, [id]);

    return (
        <Modal keepMounted open={isShow}>
            <Box sx={style}>
                {isLoading ?? <ViewPropertyModalLoadingComponent />}
                <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Typography variant="subtitle1" fontWeight={600} color={"secondary"} gutterBottom>
                        {property.unit_name}
                    </Typography>

                    <Stack direction="row" gap={1}>
                        <IconButton size="small" color={"secondary"} onClick={handleClose} >
                            <CloseRoundedIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                </Stack>
                <Stack direction="row" gap={3}>
                    <div>
                        <Typography variant="caption" color={"secondary"} display="block" >
                            Type
                        </Typography>
                        <Typography variant="caption" fontWeight={500} color={"secondary"} display="block" gutterBottom>
                            {property.unit_type_name}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="caption" color={"secondary"} display="block" >
                            Status
                        </Typography>
                        <Chip color="success" variant="outlined" label={property.unit_status_name} size="small" />
                    </div>
                </Stack>
                <Stack direction="row" justifyContent="end" gap={1} >
                    <Fab color="error" size="small">
                        <DeleteOutlineRoundedIcon fontSize="small" />
                    </Fab>
                    <Fab color="secondary" onClick={() => setIsEdit(true)} size="small">
                        <EditRoundedIcon fontSize="small" />
                    </Fab>
                </Stack>
                {isEdit && <EditPropertyModalComponent isOpen={isEdit} handleClose={() => setIsEdit(false)} property={property} />}
            </Box>
        </Modal>
    );
}