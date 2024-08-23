
import ApiConstant from "../../../../../../application/constant/api.constant"
import Failure from "../../../../../../application/failure/failure"
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util"
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util"
import DeleteTenantDataSourceParams from "./interface/delete_tenant_data_source.params"

export default async function DeleteTenantDataSource({ id }: DeleteTenantDataSourceParams): Promise<string | Failure> {
    try {
        const response = await HttpCliestUtil({
            method: "DELETE",
            url: `${ApiConstant.TENANTS}/${id}`
        })

        if (response instanceof Failure) {
            throw response
        }

        return "deleted"
    } catch (error) {
        return FailureMapperUtil(error)
    }
}