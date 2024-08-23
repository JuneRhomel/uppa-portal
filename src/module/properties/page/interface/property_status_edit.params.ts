import PropertyStatusEntity from "../../../../infrastructure/api/module/property/domain/entity/property_status.entity";

export default interface PropertyStatusEditParams {
    isOpen: boolean,
    propertyStatusEntity: PropertyStatusEntity,
    refetchpropertiesTypesAndStatus: () => void,
    refetchProperties: () => void,
    handelClose: () => void
}