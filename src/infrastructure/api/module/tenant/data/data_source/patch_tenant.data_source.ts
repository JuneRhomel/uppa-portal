import { classToPlain } from "class-transformer"

import PatchTenantDataSourceParams from "./interface/patch_tenant_data_source.params"
import ApiConstant from "../../../../../../application/constant/api.constant"
import Failure from "../../../../../../application/failure/failure"
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util"
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util"

export default async function PatchTenantDataSource({ tenantModel }: PatchTenantDataSourceParams): Promise<string | Failure> {
    try {
        const response = await HttpCliestUtil({
            method: "PATCH",
            url: `${ApiConstant.TENANTS}/${tenantModel.id}`,
            body: classToPlain(tenantModel)
        })


        if (response instanceof Failure) {
           throw response
        }

        return "updated"
    } catch (error) {
        return FailureMapperUtil(error)
    }
}