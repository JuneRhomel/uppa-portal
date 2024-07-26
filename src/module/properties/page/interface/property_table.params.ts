import { UseQueryResult } from "@tanstack/react-query";
import ListPropertiesEntity from "../../domain/entity/list_properties.entity";

export default interface PropertyTableParams {
    refetch: () => void;
    propertiesQuery: UseQueryResult<void | ListPropertiesEntity, Error>;
}