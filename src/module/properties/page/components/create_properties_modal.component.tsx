import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CreatePropertiesModalParams from "../interface/create_properties_modal.params";
import CreatePropertiesFormComponent from "./create_properties_form.component";
import { IconButton, Stack } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
export default function CreatePropertiesModalComponent({
  isOpen = false,
  handleClose,
}: CreatePropertiesModalParams) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #e0e0e0;",
    borderRadius: "4px",
    boxShadow: 24,
           p: "40px 30px"
  };


  return (
    <Modal keepMounted  open={isOpen}>
      <Box sx={style}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5" sx={{ fontWeight: "500" }} component="h5">
            Create Property
          </Typography>
          <IconButton onClick={handleClose} >
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <CreatePropertiesFormComponent handleClose={handleClose} />
      </Box>
    </Modal>
  );
}
