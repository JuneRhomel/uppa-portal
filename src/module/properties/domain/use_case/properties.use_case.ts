import PropertiesUseCaseParams from "./interface/properties_use_case.params";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import PropertiesRepository from "../../data/repository/properties.repository";
import Failure from "../../../../application/failure/failure";
import ListPropertiesEntity from "../entity/list_properties.entity";

export default async function PropertiesUseCase({
  paginationEntity,
}: PropertiesUseCaseParams): Promise<ListPropertiesEntity | Failure> {
  try {
    return await PropertiesRepository({ paginationEntity });
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
