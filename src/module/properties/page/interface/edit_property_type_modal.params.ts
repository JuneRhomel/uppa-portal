import PropertyTypEntity from "../../domain/entity/property_type.entity";

export default interface EditPropertyTypeModalParams {
    isOpen: boolean;
    handleClose: () => void;
    propertyType: PropertyTypEntity;
    refetch: () => void
}