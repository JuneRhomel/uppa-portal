
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import DeleteTenantRepository from "../../data/repository/delete_tenant.repository";
import DeleteTenantUseCaseParams from "./interface/delete_tenant_use_case.params";

export default async function DeleteTenantUseCase({ id }: DeleteTenantUseCaseParams): Promise<string | Failure> {
    try {
        return await DeleteTenantRepository({ id });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}