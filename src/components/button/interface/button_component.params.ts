export default interface ButtonComponentParams {
    children: React.ReactNode;
    variant: "contained" | "outlined" | "text";
    size: "small" | "medium" | "large";
    type: "button" | "submit" | "reset";
    disabled?: boolean;
    isLoading?: boolean;
    onClick?: () => void;
}