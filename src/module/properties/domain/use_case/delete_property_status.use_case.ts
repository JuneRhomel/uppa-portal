import Failure from "../../../../application/failure/failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import DeletePropertyStatusRepository from "../../data/repository/delete_property_status.repository";
import DeletePropertyStatusUseCaseParams from "./interface/delete_property_status_use_case.params";

export default async function DeletePropertyStatusUseCase({
    propertyStatusId,
}: DeletePropertyStatusUseCaseParams): Promise<void | Failure> {
    try {
        return await DeletePropertyStatusRepository({ propertyStatusId });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}