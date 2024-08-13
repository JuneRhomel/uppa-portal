import PropertyTypeEntity from "../../domain/entity/property_type.entity";

export default interface PropertyTypeEditParams {
    isOpen: boolean,
    propertyTypeEntity: PropertyTypeEntity,
    refetchpropertiesTypesAndStatus: () => void,
    refetchProperties: () => void
    handelClose: () => void
}