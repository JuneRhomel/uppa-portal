import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import PatchPropertyStatusRepository from "../../data/repository/patch_property_status.repository";
import EditPropertyStatusUseCaseParams from "./interface/patch_property_status_use_case.params";

export default async function PatchPropertyStatusUseCase({ propertyStatusEntity }: EditPropertyStatusUseCaseParams) {
    try {
        return await PatchPropertyStatusRepository({ propertyStatusEntity });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}