import ApiConstant from "../../../../application/constant/api.constant";
import Failure from "../../../../application/failure/failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import HttpCliestUtil from "../../../../util/http_client/http_cliest.util";
import DeletePropertyStatusRepositoryParams from "./interface/delete_property_status_data_source.params";

export default async function DeletePropertyStatusDataSource({
    propertyStatusId,
}: DeletePropertyStatusRepositoryParams): Promise<Failure | void> {
    try {
        const response = await HttpCliestUtil({
            method: "DELETE",
            url: `${ApiConstant.PROPERTY_STATUS}/${propertyStatusId}`,
        });

        if (response instanceof Failure) {
            return response;
        }
    } catch (error) {
        return FailureMapperUtil(error);
    }
}