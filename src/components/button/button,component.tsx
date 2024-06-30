import React from "react";
import { Button, CircularProgress } from "@mui/material";
import ButtonComponentParams from "./interface/button_component.params";

export default function ButtonComponent({
  children,
  type,
  size,
  variant = "contained",
  isLoading,
  onClick,
}: ButtonComponentParams) {
  return (
    <Button
      fullWidth
      variant={variant}
      type={type}
      onClick={onClick}
      size={size}
      disabled={isLoading}
    >
      {isLoading ? <CircularProgress color="inherit" size={24} /> : children}
    </Button>
  );
}
