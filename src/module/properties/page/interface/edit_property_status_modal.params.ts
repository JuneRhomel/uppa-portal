import PropertyStatusEntity from "../../domain/entity/property_status.entity";

export default interface EditPropertyStatusModalParams {
    isOpen?: boolean;
    handleClose: () => void;
    propertyStatus: PropertyStatusEntity;
}