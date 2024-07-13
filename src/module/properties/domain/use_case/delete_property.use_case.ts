import Failure from "../../../../application/failure/failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import DeletePropertyRepository from "../../data/repository/delete_property.repository";
import DeletePropertyUseCaseParams from "./interface/delete_property_use_case.params";

export default async function DeletePropertyUseCase({
  id,
}: DeletePropertyUseCaseParams): Promise<void | Failure> {
  try {
    return await DeletePropertyRepository({ id });
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
