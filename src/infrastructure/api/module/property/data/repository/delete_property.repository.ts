
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import DeletePropertyDataSource from "../data_source/delete_property.data_source";
import DeletePropertyRepositoryParams from "./interface/delete_property_repository.params";

export default async function DeletePropertyRepository({
  id,
}: DeletePropertyRepositoryParams) {
  try {
    return await DeletePropertyDataSource({ id });
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
