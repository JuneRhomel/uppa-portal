import { plainToInstance } from "class-transformer";
import Failure from "../../../../application/failure/failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import PatchTenantDataSource from "../data_source/patch_tenant.data_source";
import PatchTenantRepositoryParams from "./interface/patch_tenant_repository.params";
import TenantModel from "../model/tenant.model";

export default async function PatchTenantRepository({ tenantEntity }: PatchTenantRepositoryParams): Promise<string | Failure> {
    try {
        const tenantModel = plainToInstance(TenantModel, tenantEntity, {
            excludeExtraneousValues: true
        })
        return await PatchTenantDataSource({ tenantModel });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}