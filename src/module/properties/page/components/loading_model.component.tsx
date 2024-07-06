import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { FormControl, Grid, Skeleton, Stack } from "@mui/material";
import CreatePropertiesFormContainerStyle from "../style/create_properties_form_container.style";

export default function LoadingModalComponentStyle() {
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
    p: 2,
  };
  return (
    <Modal keepMounted open={true}>
      <Box sx={style}>
        <Stack direction="row" justifyContent="space-between">
          <Skeleton variant="rectangular" width={100} height={30} />
          <Skeleton variant="circular" width={30} height={30} />
        </Stack>
        <CreatePropertiesFormContainerStyle>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Skeleton variant="rectangular"  height={30} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" height={30} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" height={30} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={30} />
            </Grid>
          </Grid>
        </CreatePropertiesFormContainerStyle>
        <Stack direction="row" justifyContent="flex-end" >
          <Skeleton variant="rectangular" height={20} width={100} />
        </Stack>
      </Box>
    </Modal>
  );
}
