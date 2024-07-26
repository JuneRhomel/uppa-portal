import PropertiesEntity from "../../domain/entity/properties.entity";

export default interface DeletePropertyModalParams {
    isOpen?: boolean;
    handleClose: () => void;
    handleCloseModal: () => void;
    property: PropertiesEntity;
    refetch: () => void;
}