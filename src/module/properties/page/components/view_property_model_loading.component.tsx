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
        <>
            <Stack direction="row" justifyContent="space-between" mb={2}>
                <Skeleton variant="rounded" width={300} height={30} />
                <Skeleton variant="circular" width={30} height={30} />
            </Stack>
            <Stack direction="row" gap={3}>
                <div>
                    <Box mb={1}>
                        <Skeleton variant="rounded" width={100} height={15} />
                    </Box>

                    <Skeleton variant="rounded" width={150} height={20} />
                </div>
                <div>
                    <Box mb={1}>
                        <Skeleton variant="rounded" width={100} height={15} />
                    </Box>

                    <Skeleton variant="rounded" width={150} height={20} />
                </div>
            </Stack>
            <Stack direction="row" justifyContent="end" mt={2} gap={1} >
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="circular" width={30} height={30} />
            </Stack>
        </>
    );
}