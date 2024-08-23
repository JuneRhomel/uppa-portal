
import { plainToInstance } from "class-transformer";
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import PostTenantDataSource from "../data_source/post_tenant.data_source";
import TenantModel from "../model/tenant.model";
import PostTenantRepositoryParams from "./interface/post_tenant_repository.params";

export default async function PostTenantRepository({ tenantEntity }: PostTenantRepositoryParams): Promise<string | Failure> {
    try {
        const tenantModel = plainToInstance(TenantModel, tenantEntity, {
            excludeExtraneousValues: true
        });

        return await PostTenantDataSource({ tenantModel });

    } catch (error) {
        return FailureMapperUtil(error);
    }
}