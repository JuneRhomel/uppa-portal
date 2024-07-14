import { Modal, Box, IconButton, Stack, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import EditPropertyStatusModalParams from "../interface/edit_property_status_modal.params";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LoadingButton from "@mui/lab/LoadingButton";
import PatchPropertyStatusUseCase from "../../domain/use_case/patch_property_status.use_case";
import { useAlert } from '../../../../application/provider/alert_context/alert_context.provider';
import Failure from "../../../../application/failure/failure";


export default function EditPropertyStatusModalComponent({ isOpen = false, handleClose, propertyStatus }: EditPropertyStatusModalParams) {
    const { showAlert } = useAlert();
    const [propertyStatusName, setPropertyStatusName] = useState("");
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

    const [isLoadingSave, setIsLoadingSave] = React.useState(false);
    const [error, setError] = useState('');

    const handelSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!propertyStatusName) {
            setError('Property Status Name must be less than 50 characters');
            return;
        }
        propertyStatus.unit_status_name = propertyStatusName;

        setIsLoadingSave(true);
        const response = await PatchPropertyStatusUseCase({ propertyStatusEntity: propertyStatus });

        if (response instanceof Failure) {
            showAlert('Something went wrong', 'error');
            return
        }

        setIsLoadingSave(false);
        handleClose();
        setPropertyStatusName("");
        showAlert('Successfully edited property status', 'success', "Saved");

    }

    return (
        <Modal keepMounted open={isOpen}>
            <Box sx={style}>
                <Stack direction="row" alignItems={"center"} justifyContent="space-between" mb={2}>
                    <Typography variant="subtitle1" fontWeight={600} color={"secondary"} >
                        Edit Property Status : {propertyStatus.unit_status_name}
                    </Typography>

                    <IconButton
                        onClick={handleClose}
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                </Stack>
                <form onSubmit={handelSave}>
                    <TextField
                        error={!!error}
                        helperText={error}
                        fullWidth
                        onChange={(e) => setPropertyStatusName(e.target.value)}
                        label={propertyStatus.unit_status_name}
                        variant="outlined"
                        size="small"
                    />
                    <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
                        <Button color="secondary" size="small" onClick={handleClose}>Cancel</Button>
                        <LoadingButton
                            type="submit"
                            size="small"
                            loading={isLoadingSave}
                            variant="contained"
                        >
                            <span>Save</span>
                        </LoadingButton>
                    </Stack>
                </form>
            </Box>
        </Modal>
    )
}