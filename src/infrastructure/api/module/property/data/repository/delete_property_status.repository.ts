
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import DeletePropertyStatusDataSource from "../data_source/delete_property_status.data_source";
import DeletePropertyStatusRepositoryParams from "./interface/delete_property_status_repository.params";

export default async function DeletePropertyStatusRepository({
    propertyStatusId,
}: DeletePropertyStatusRepositoryParams) {
    try {

        return await DeletePropertyStatusDataSource({ propertyStatusId });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}