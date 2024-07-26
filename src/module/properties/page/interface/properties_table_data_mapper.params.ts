import PropertiesEntity from "../../domain/entity/properties.entity";

export default interface PropertiesTableDataMapperParams {
    properties: PropertiesEntity[],
    refetch: () => void
}