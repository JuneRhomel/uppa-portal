// src/components/CustomAlert.tsx

import React from 'react';
import { Alert, AlertTitle, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import AlertComponentParams from './interface/alert_component.params';

const AlertContainer = styled('div')({
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9900,
    boxShadow: '0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%)',
});

export default function AlertComponent({
    title,
    children,
    onClose,
    slideDirection = 'left',
    open,
    severity = 'info',
}: AlertComponentParams) {
    return (
        <AlertContainer>
            <Slide direction={slideDirection} in={open} mountOnEnter unmountOnExit>
                <Alert
                    severity={severity}
                    action={
                        onClose ? (
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={onClose}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        ) : null
                    }
                >
                    {title && <AlertTitle>{title}</AlertTitle>}
                    {children}
                </Alert>
            </Slide>
        </AlertContainer>
    );
}
