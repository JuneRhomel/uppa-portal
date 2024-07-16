import PropertyStatusSettingsModalParams from "../interface/property_status_settings_modal.params";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Stack, Typography, IconButton, Skeleton, Button } from "@mui/material";
import PropertyStatusEntity from "../../domain/entity/property_status.entity";
import GetPropertyStatusUseCase from "../../domain/use_case/get_property_status.use_case";
import Failure from "../../../../application/failure/failure";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EditPropertyStatusModalComponent from "./edit_property_status_modal.component";


export default function PropertyStatusSettingsModalComponent({ isOpen, handleClose ,}: PropertyStatusSettingsModalParams) {
    const [listPropertyStatus, setListPropertyStatus] = useState([] as PropertyStatusEntity[]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [selectedPropertyStatus, setSelectedPropertyStatus] = useState({} as PropertyStatusEntity);
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
        p: "40px 30px"
    };

    const propertyStatusQuery = async () => {

        const response = await GetPropertyStatusUseCase();
        if (response instanceof Failure) {
            alert(response.message);
        }

        return response;
    }

    useEffect(() => {
        document.title = "Property Status Settings - Properties";
        const fetchPropertyStatus = async () => {
            setIsLoading(true);

            const propertyStatus = await propertyStatusQuery() as PropertyStatusEntity[];
            setListPropertyStatus(propertyStatus);

            setIsLoading(false);
        };

        fetchPropertyStatus();
    }, []);

    const handleCloseEdit = () => {
        setIsOpenEdit(false);
    }
    const handleEditStatus = (propertyStatus: PropertyStatusEntity) => {
        setSelectedPropertyStatus(propertyStatus);
        setIsOpenEdit(true);
    }
    const Render = () => {
        if (isLoading) {
            return <Skeleton height={300} />
        }
        return (
            <>
                <Stack direction="row" alignItems={"center"} justifyContent="space-between" mb={2}>
                    <Typography variant="subtitle1" fontWeight={600} color={"secondary"} >
                        Property Status Settings
                    </Typography>

                    <IconButton
                        onClick={handleClose}
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                </Stack>
                <Stack spacing={1}>
                    {listPropertyStatus.map((propertyStatus) => (
                        <Stack key={propertyStatus.id} direction="row" alignItems={"center"} justifyContent="space-between" >
                            <Stack direction="row" width={"100%"} alignItems={"center"} justifyContent={"space-between"} borderRadius={1} border={"1px solid #e0e0e0"} p={1}>
                                <Typography variant="subtitle1" fontWeight={400} color={"secondary"} >
                                    {propertyStatus.unit_status_name}
                                </Typography>
                                <Stack direction="row">
                                    <IconButton color="primary" onClick={() => handleEditStatus(propertyStatus)}>
                                        <EditRoundedIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </Stack>
                    ))}
                    {isOpenEdit && <EditPropertyStatusModalComponent isOpen={isOpenEdit} handleClose={handleCloseEdit} propertyStatus={selectedPropertyStatus} />}                </Stack>
            </>
        )
    }

    return (
        <Modal keepMounted open={isOpen}>
            <Box sx={style}>
                {Render()}
            </Box>
        </Modal>


    );
}