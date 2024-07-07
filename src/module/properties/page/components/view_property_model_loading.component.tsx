import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Skeleton, Stack } from "@mui/material";

export default function ViewPropertyModalLoadingComponent() {

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
    return (
        <Stack direction="row" justifyContent="space-between">
            <Skeleton variant="rectangular" width={100} height={30} />
            <Skeleton variant="circular" width={30} height={30} />
        </Stack>
    );
}