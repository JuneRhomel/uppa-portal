import React, { useEffect, useState } from "react";
import { useAlert } from '../../../../application/provider/alert_context/alert_context.provider';
import DeletePropertyModalParams from "../interface/delete_property_model.params"
import { Modal, Box, AlertTitle, Typography, Alert, Stack, Button } from "@mui/material";
import DeletePropertyUseCase from "../../domain/use_case/delete_property.use_case"
import LoadingButton from "@mui/lab/LoadingButton";
import Failure from "../../../../application/failure/failure";
import { useNavigate } from "react-router-dom";

export default function DeletePropertyModalComponet({ isOpen = true, handleClose, property, handleCloseModal }: DeletePropertyModalParams) {
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [isLoadingSave, setIsLoadingSave] = useState(false);
    useEffect(() => {
        document.title = "Delete Property - Properties";
    }, [])
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

    const handelDeleteProperty = () => {
        setIsLoadingSave(false)
        const response = DeletePropertyUseCase({ id: property.id })
        if (response instanceof Failure) {
            showAlert("Failed to deleted this property", "error");
            return
        }
        setIsLoadingSave(true)
        showAlert("Property deleted successfully", "success");
        isOpen = false;
        navigate("/properties")
        handleCloseModal();
    }

    return (
        <Modal keepMounted open={isOpen}>
            <Box sx={style}>
                <Typography textAlign="center" sx={{ fontWeight: "500" }} >
                    Delete Property
                </Typography>
                <Typography component="p" textAlign="center" sx={{ fontWeight: "400", fontSize: 14 }} mt={1} mb={2}>
                    Are you sure you want to delete <b>{property.unit_name} </b>?
                </Typography>
                <Alert variant="outlined" severity="warning" title="Warning">
                    <AlertTitle fontSize={12}>Warning</AlertTitle>
                    <Typography component="p" textAlign="center" sx={{ fontWeight: "300", fontSize: 10 }} >
                        By Deleteing this property, you won't able to retrive it again
                    </Typography>
                </Alert>
                <Stack direction="row" justifyContent="flex-end" spacing={1} mt={2}>
                    <Button onClick={handleClose} color="secondary"> No </Button>
                    <LoadingButton
                        variant="contained"
                        color="error"
                        loading={isLoadingSave}
                        onClick={handelDeleteProperty}>
                        Yes
                    </LoadingButton>
                </Stack>
            </Box>
        </Modal >
    )
}