export default interface TableHeaderComponentParams {
    filter?: React.ReactNode;
    create?: boolean;
    onFilter?: () => void;
    reload?: boolean;
    onReload?: () => void
}