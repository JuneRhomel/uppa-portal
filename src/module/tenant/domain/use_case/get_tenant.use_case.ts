import Failure from "../../../../application/failure/failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import GetTenantRepository from "../../data/repository/get_tenant.repository";
import TenantEntity from "../entity/tenant.entity";
import GetTenantUseCaseParams from "./interface/get_tenant_use_case.params";

export default async function GetTenantUseCase({ id }: GetTenantUseCaseParams): Promise<TenantEntity | Failure> {
    try {
        return await GetTenantRepository({ id });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}