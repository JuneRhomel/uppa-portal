import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditPropertyModalParams from "../interface/edit_property_modal.params";
import { IconButton, Stack } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditPropertyFormComponent from "./edit_property_form.compoent";
export default function EditPropertyModalComponent({
    isOpen = false,
    handleClose,
    property,
    refetch
}: EditPropertyModalParams) {
    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "background.paper",
        border: "2px solid #e0e0e0;",
        borderRadius: "4px",
        boxShadow: 24,
        p: "40px 30px"
    };


    return (
        <Modal keepMounted open={isOpen}>
            <Box sx={style}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1" fontWeight={600} color={"secondary"} >
                        Edit Property
                    </Typography>
                    <IconButton onClick={handleClose} >
                        <CloseRoundedIcon />
                    </IconButton>
                </Stack>
                <EditPropertyFormComponent refetch={refetch} property={property} handleClose={handleClose} />
            </Box>
        </Modal>
    );
}
