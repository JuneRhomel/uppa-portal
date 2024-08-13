import { plainToInstance } from "class-transformer";
import Failure from "../../../../application/failure/failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import TenantEntity from "../../domain/entity/tenant.entity";
import GetTenantDataSource from "../data_source/get_tenant.data_source";
import GetTenantRepositoryParams from "./interface/get_tenant_repository.params";

export default async function GetTenantRepository({ id }: GetTenantRepositoryParams): Promise<TenantEntity | Failure> {
    try {
        const response = await GetTenantDataSource({ id });

        if (response instanceof Failure) {
            return response;
        }

        return plainToInstance(TenantEntity, response, {
            excludeExtraneousValues: true
        });

    } catch (error) {
        return FailureMapperUtil(error);
    }
}