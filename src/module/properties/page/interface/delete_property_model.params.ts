import PropertiesEntity from "../../domain/entity/properties.entity";

export default interface DeletePropertyModalParams {
    isOpen?: boolean;
    handleClose: () => void;
    property: PropertiesEntity;
}