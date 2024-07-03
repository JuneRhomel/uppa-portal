export default interface ButtonComponentParams {
    children: React.ReactNode;
    variant: "contained" | "outlined" | "text";
    size: "small" | "medium" | "large";
    type: "button" | "submit" | "reset";
    disabled?: boolean;
    isLoading?: boolean;
    sx?: any;
    style?: any;
    onClick?: () => void;
}