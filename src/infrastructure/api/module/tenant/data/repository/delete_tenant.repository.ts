
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import DeleteTenantDataSource from "../data_source/delete_tenant.data_source";
import DeleteTenantRepositoryParams from "./interface/delete_tenant_repository.params";

export default async function DeleteTenantRepository({ id }: DeleteTenantRepositoryParams): Promise<string | Failure> {
    try {
        return await DeleteTenantDataSource({ id });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}