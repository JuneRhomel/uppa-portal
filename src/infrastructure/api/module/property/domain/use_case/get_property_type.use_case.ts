
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import GetPropertyTypeRepository from "../../data/repository/get_property_type.repository";

export default async function GetPropertyTypeUseCase() {
  try {
    const response = await GetPropertyTypeRepository();

    if (response instanceof Failure) {
      return response;
    }

    return response;
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
