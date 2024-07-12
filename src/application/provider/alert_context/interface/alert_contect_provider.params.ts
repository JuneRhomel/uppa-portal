export default interface AlertContextParams {
    open: boolean;
    severity: "success" | "info" | "warning" | "error";
    title?: string;
    onClose?: () => void;
    slideDirection?: "left" | "right" | "top" | "bottom";
    children: React.ReactNode;
}