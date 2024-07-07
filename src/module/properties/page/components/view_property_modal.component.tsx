import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import GetPropertyUseCase from "../../domain/use_case/get_property.use_case";
import PropertiesEntity from "../../domain/entity/properties.entity";
import ViewPropertyParams from "../interface/view_property.params";
import { IconButton, Stack, Typography } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ViewPropertyModalLoadingComponent from "./view_property_model_loading.component";

export default function ViewPropertyModalComponent({ id, isShow = false, handleClose }: ViewPropertyParams) {
    const [property, setProperty] = useState({} as PropertiesEntity);
    const [isLoading, setIsLoading] = useState(true);
    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "calc(100vw - 100px)",
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
        fetchProperty(id)
    }, []);

    return (
        <Modal keepMounted open={isShow}>
            <Box sx={style}>
            {isLoading ?? <ViewPropertyModalLoadingComponent />}
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h5" sx={{ fontWeight: "500" }} component="h5">
                        {property.unit_name}
                    </Typography>
                    <IconButton onClick={handleClose} >
                        <CloseRoundedIcon />
                    </IconButton>
                </Stack>
            </Box>
        </Modal>
    );
}