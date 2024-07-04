import PropertiesUseCaseParams from "./interface/properties_use_case.params";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import PropertiesRepository from "../../data/repository/properties.repository";

export default async function PropertiesUseCase({
  paginationEntity,
}: PropertiesUseCaseParams) {
  try {
    return await PropertiesRepository({ paginationEntity });
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
