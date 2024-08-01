import { classToPlain } from "class-transformer";
import ApiConstant from "../../../../application/constant/api.constant";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import HttpCliestUtil from "../../../../util/http_client/http_cliest.util";
import TenantEntity from "../../domain/entity/tenant.entity";
import PostTenantDataSourceParams from "./interface/post_tenant.data_source.params";
import Failure from "../../../../application/failure/failure";

export default async function PostTenantDataSource({ tenantModel }: PostTenantDataSourceParams): Promise<string | Failure> {
    try {
        const response = await HttpCliestUtil({
            method: "POST",
            url: ApiConstant.TENANTS,
            body: classToPlain(tenantModel)
        })

        if (response instanceof Failure) {
            return response;
        }

        return "saved";
    } catch (error) {
        return FailureMapperUtil(error);
    }
}