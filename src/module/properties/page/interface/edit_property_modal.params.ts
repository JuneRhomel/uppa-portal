import PropertiesEntity from "../../domain/entity/properties.entity";

export default interface EditPropertyModalParams {
    isOpen?: boolean;
    handleClose: () => void;
    property: PropertiesEntity;
    refetch: () => void;
}