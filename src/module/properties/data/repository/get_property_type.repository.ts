import Failure from "../../../../application/failure/failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import GetPropertyTypeDataSource from "../data_source/get_property_type.data_source";
import PropertyTypeEntity from "../../domain/entity/property_type.entity";
export default async function GetPropertyTypeRepository(): Promise<
  PropertyTypeEntity[] | Failure
> {
  try {
    const response = await GetPropertyTypeDataSource();

    if (response instanceof Failure) {
      return response;
    }
    return response;
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
