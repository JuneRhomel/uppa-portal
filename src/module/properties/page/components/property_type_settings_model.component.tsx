import React, { useEffect, useState } from "react";
import PropertyTypeSettingsModalParams from "../interface/property_type_settings_modal.params";
import GetPropertyTypeUseCase from "../../domain/use_case/get_property_type.use_case";
import Failure from "../../../../application/failure/failure";
import PropertyTypEntity from "../../domain/entity/property_type.entity";
import { Modal, Box, Stack, Typography, IconButton } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EditPropertyTypeModalComponent from "./edit_property_type_modal.component";


export default function PropertyTypeSettingsModalComponent({ isOpen, handleClose }: PropertyTypeSettingsModalParams) {
    const [listPropertyType, setListPropertyType] = useState([] as PropertyTypEntity[]);
    const [selectedPropertyType, setSelectedPropertyType] = useState({} as PropertyTypEntity);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
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

    const propertyTypeQuery = async () => {
        const response = await GetPropertyTypeUseCase();
        if (response instanceof Failure) {
            alert(response.message);
        }
        return response;
    }

    useEffect(() => {
        const fetchPropertyTypes = async () => {
            const propertyTypes = await propertyTypeQuery() as PropertyTypEntity[];
            setListPropertyType(propertyTypes);
        };
        fetchPropertyTypes();
    }, [])

    const handleSelectedPropertyType = (propertyType: PropertyTypEntity) => {
        setSelectedPropertyType(propertyType);
        setIsOpenEdit(true);
    }
    const handleCloseEdit = () => {
        setIsOpenEdit(false);
    }

    return (
        <>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={4}
                    >
                        <Typography variant="subtitle1" fontWeight={600} color={"secondary"} >Property Type Settings</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseRoundedIcon />
                        </IconButton>
                    </Stack>
                    <Stack spacing={1}>
                        {listPropertyType.map((propertyType) => (
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                key={propertyType.id}
                                borderRadius={1}
                                border={"1px solid #e0e0e0"} p={1}
                            >
                                <Typography variant="body1" color={"secondary"}>{propertyType.unit_type_name}</Typography>
                                <IconButton color="primary" onClick={() => handleSelectedPropertyType(propertyType)}>
                                    <EditRoundedIcon fontSize="small" />
                                </IconButton>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            </Modal>
            {isOpenEdit && <EditPropertyTypeModalComponent isOpen={isOpenEdit} handleClose={handleCloseEdit} propertyType={selectedPropertyType} />}
        </>
    )
}