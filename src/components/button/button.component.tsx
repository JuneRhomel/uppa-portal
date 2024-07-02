import React from "react";
import { Button, CircularProgress } from "@mui/material";
import ButtonComponentParams from "./interface/button_component.params";

export default function ButtonComponent({
  children,
  type = "button",
  size = "small",
  variant = "contained",
  isLoading = false,
  onClick,
  sx
}: ButtonComponentParams) {
  return (
    <Button
      fullWidth
      variant={variant}
      type={type}
      onClick={onClick}
      size={size}
      disabled={isLoading}
      sx={sx}
    >
      {isLoading ? <CircularProgress color="inherit" size={24} /> : children}
    </Button>
  );
}
