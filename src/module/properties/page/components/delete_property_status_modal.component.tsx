import React, { useEffect, useState } from "react";
import DeletePropertyStatusModalParams from "../interface/delete_property_status_modal.params";
import { useNavigate } from "react-router-dom";
import { useAlert } from '../../../../application/provider/alert_context/alert_context.provider';
import DeletePropertyStatusUseCase from "../../domain/use_case/delete_property_status.use_case"
import Failure from "../../../../application/failure/failure";
import LoadingButton from "@mui/lab/LoadingButton";
import { Modal, Box, Typography, Alert, AlertTitle, Stack, Button } from "@mui/material";

export default function DeletePropertyStatusModalComponent({ isOpen = true, handleClose, propertyStatus }: DeletePropertyStatusModalParams) {
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const [isLoadingSave, setIsLoadingSave] = useState(false);
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

    const handelDeletePropertyStatus = () => {
        setIsLoadingSave(false)
        const response = DeletePropertyStatusUseCase({ propertyStatusId: propertyStatus.id })
        if (response instanceof Failure) {
            showAlert("Failed to deleted this property status", "error");
            return
        }
        setIsLoadingSave(true)
        showAlert("Property status deleted successfully", "success");
        navigate("/properties")
        handleClose();
    }

    return (
        <Modal keepMounted open={isOpen}>
            <Box sx={style}>
                <Typography textAlign="center" sx={{ fontWeight: "500" }} >
                    Delete Property Status
                </Typography>
                <Typography component="p" textAlign="center" sx={{ fontWeight: "400", fontSize: 14 }} mt={1} mb={2}>
                    Are you sure you want to delete <b>{propertyStatus.unit_status_name} </b>?
                </Typography>
                <Alert variant="outlined" severity="warning" title="Warning">
                    <AlertTitle fontSize={12}>Warning</AlertTitle>
                    <Typography component="p" textAlign="center" sx={{ fontWeight: "300", fontSize: 10 }} >
                        By Deleteing this property status, you won't able to retrive it again
                    </Typography>
                </Alert>
                <Stack direction="row" justifyContent="flex-end" spacing={1} mt={2}>
                    <Button onClick={handleClose} color="secondary"> No </Button>
                    <LoadingButton
                        variant="contained"
                        color="error"
                        onClick={handelDeletePropertyStatus}
                        loading={isLoadingSave}
                    >
                        Yes
                    </LoadingButton>
                </Stack>
            </Box>
        </Modal >
    )

}