import ApiConstant from "../../../../application/constant/api.constant";
import Failure from "../../../../application/failure/failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import HttpCliestUtil from "../../../../util/http_client/http_cliest.util";
import PatchPropertyStatusDataSourceParams from "./interface/patch_property_status_data_source.params";

export default async function PatchPropertyStatusDataSource(
    { propertyStatusModel }: PatchPropertyStatusDataSourceParams
): Promise<void | Failure> {
    try {
        const payload = { unit_status_name: propertyStatusModel.unit_status_name };
        const response = await HttpCliestUtil({
            method: "PATCH",
            url: `${ApiConstant.PROPERTY_STATUS}/${propertyStatusModel.id}`,
            body: payload
        });

        if (response instanceof Failure) {
            return response;
        }
    } catch (error) {
        return FailureMapperUtil(error);
    }
}
