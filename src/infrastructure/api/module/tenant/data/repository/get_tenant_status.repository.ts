
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import TenantStatusEntity from "../../domain/entity/tenant_status.entity";
import GetTenantStatusDataSource from "../data_source/get_tenant_stauts.data_source";

export default async function GetTenantStatusRepository(): Promise<TenantStatusEntity[] | Failure> {
    try {
        const response = await GetTenantStatusDataSource();

        if (response instanceof Failure) {
            return response;
        }

        return response;

    } catch (error) {
        return FailureMapperUtil(error);
    }
}