
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import PropertiesEntity from "../../domain/entity/properties.entity";
import GetPropertyDataSource from "../data_source/get_property.data_source";
import GetPropertyRepositoryParams from "./interface/get_property_repository.params";
export default async function GetPropertyRepository({
  id,
}: GetPropertyRepositoryParams): Promise<PropertiesEntity | Failure> {
  try {
    return await GetPropertyDataSource({ id });
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
