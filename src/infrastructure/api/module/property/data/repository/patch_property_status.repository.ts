
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import PatchPropertyStatusDataSource from "../data_source/patch_property_status.data_source";
import PropertyStatusModel from "../model/property_status.model";
import PatchPropertyStatusRespositoryParams from "./interface/patch_property_repository.params";

export default async function PatchPropertyStatusRepository({
    propertyStatusEntity,
}: PatchPropertyStatusRespositoryParams) {
    try {
        const propertyStatusModel = new PropertyStatusModel(
            propertyStatusEntity.id,
            propertyStatusEntity.unit_status_name,
        );

        return await PatchPropertyStatusDataSource({
            propertyStatusModel
        });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}