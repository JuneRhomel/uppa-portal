import { AlertProps } from "@mui/material";

export default interface AlertComponentParams extends AlertProps {
  title?: string;
  children: React.ReactNode;
  severity?: "success" | "info" | "warning" | "error" | undefined;
  onClose?: () => void;
  slideDirection?: "right" | "left" | "up" | "down" | undefined;
  message?: string;
  open?: boolean;
}
