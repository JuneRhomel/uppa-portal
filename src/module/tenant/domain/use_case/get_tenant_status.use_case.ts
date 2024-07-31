import Failure from "../../../../application/failure/failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import GetTenantStatusRepository from "../../data/repository/get_tenant_status.repository";
import TenantStatusEntity from "../entity/tenant_status.entity";

export default async function GetTenantStatusUseCase(): Promise<TenantStatusEntity | Failure> {
    try {
        return await GetTenantStatusRepository();
    } catch (error) {
        return FailureMapperUtil(error);
    }
}``