import Failure from "../../../../application/failure/failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import DeleteTenantDataSourceParams from "../../data/data_source/interface/delete_tenant_data_source.params";
import DeleteTenantRepository from "../../data/repository/delete_tenant.repository";

export default async function DeleteTenantUseCase({ id }: DeleteTenantDataSourceParams): Promise<string | Failure> {
    try {
        return await DeleteTenantRepository({ id });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}