import GetTenantListRepositoryParams from "./interface/get_tenant_list_use_case.params";
import GetTenantListRepository from "../../data/repository/get_tenant_list.repository";

export default async function GetTenantListUseCase({
    paginationEntity
}: GetTenantListRepositoryParams) {
    return await GetTenantListRepository({
        paginationEntity
    });
}