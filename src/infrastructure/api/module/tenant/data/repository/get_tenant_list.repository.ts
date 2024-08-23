
import Failure from "../../../../../../application/failure/failure";
import PaginationModel from "../../../../../../application/model/pagination.model";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import GetTenantListDataSource from "../data_source/get_tenant_list.data_source";
import TenantListModel from "../model/tenant_list.model";
import GetTenantListRepositoryParams from "./interface/get_tenant_list_repository.params";

export default async function GetPropertyListRepository({
    paginationEntity
}: GetTenantListRepositoryParams):
    Promise<TenantListModel | Failure> {
    try {
        const paginationModel = new PaginationModel(
            paginationEntity.search,
            paginationEntity.page,
            paginationEntity.numberOfRows,
            paginationEntity.columns,
            paginationEntity.sortBy,
            paginationEntity.sortOrder,
            paginationEntity.filters
        );
        const response = await GetTenantListDataSource({
            paginationModel
        });

        if (response instanceof Failure) {
            return response;
        }
        return new TenantListModel(response.tenants, response.totalRows);

    } catch (error) {
        return FailureMapperUtil(error);
    }
}