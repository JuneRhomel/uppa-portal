
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import GetPropertyRepository from "../../data/repository/get_property.repository";
import PropertiesEntity from "../entity/properties.entity";
import GetPropertyUseCaseParams from "./interface/get_property_use_case.params";

export default async function GetPropertyUseCase({
  id,
}: GetPropertyUseCaseParams): Promise<PropertiesEntity | Failure> {
  try {
    return await GetPropertyRepository({ id });
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
