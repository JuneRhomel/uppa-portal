import { Modal, Box, Stack, Typography, IconButton, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useAlert } from "../../../../application/provider/alert_context/alert_context.provider";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditPropertyTypeModalParams from "../interface/edit_property_type_modal.params";
import PatchPropertyTypeUseCase from "../../domain/use_case/patch_property_type.use_case";
import Failure from "../../../../application/failure/failure";
import LoadingButton from "@mui/lab/LoadingButton";

export default function EditPropertyTypeModalComponent({ isOpen = false, handleClose, propertyType, refetch }: EditPropertyTypeModalParams) {
    const { showAlert } = useAlert();
    
    const [isLoadingSave, setIsLoadingSave] = useState(false);
    const [error, setError] = useState('');

    const [propertyTypeName, setPropertyTypeName] = useState(propertyType.unit_type_name);
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

    const handleSumit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!propertyTypeName) {
            setError('Property Type Name must have a value');
            return;
        }
        propertyType.unit_type_name = propertyTypeName;
        setIsLoadingSave(true);
        const response = await PatchPropertyTypeUseCase({
            propertyTypeEntity: propertyType
        })
        if (response instanceof Failure) {
            showAlert("Failed to Update Property Type", "error");
            return
        }
        refetch();
        handleClose();
        setPropertyTypeName(propertyType.unit_type_name);
        showAlert("Property Type Updated Successfully", "success");
        setIsLoadingSave(false);
    }

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack direction="row" alignItems={"center"} justifyContent="space-between" mb={2}>
                    <Typography variant="subtitle1" fontWeight={600} color={"secondary"} >  Edit Property Type : {propertyType.unit_type_name}</Typography>
                    <IconButton
                        onClick={handleClose}
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                </Stack>
                <form onSubmit={handleSumit} >
                    <TextField
                        fullWidth
                        label="Property Type Name"
                        variant="outlined"
                        value={propertyTypeName}
                        onChange={(e) => setPropertyTypeName(e.target.value)} />
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={3}
                    >
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            loading={isLoadingSave}
                        >
                            Save
                        </LoadingButton>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
}