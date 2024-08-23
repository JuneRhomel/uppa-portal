import PropertiesUseCaseParams from "./interface/properties_use_case.params";
import PropertiesRepository from "../../data/repository/properties.repository";
import ListPropertiesEntity from "../entity/list_properties.entity";
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";

export default async function PropertiesUseCase({
  paginationEntity,
}: PropertiesUseCaseParams): Promise<ListPropertiesEntity | Failure> {
  try {
    return await PropertiesRepository({ paginationEntity });
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
