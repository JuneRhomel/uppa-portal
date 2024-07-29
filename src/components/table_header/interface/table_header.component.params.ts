export default interface TableHeaderComponentParams {
    filter?: React.ReactNode;
    create?: React.ReactNode;
    onFilter?: () => void;
    reload?: boolean;
    onReload?: () => void;
    prefix ?: React.ReactNode;
}