import GetTenantListRepository from "../../data/repository/get_tenant_list.repository";
import GetTenantListUseCaseParams from "./interface/get_tenant_list_use_case.params";

export default async function GetTenantListUseCase({
    paginationEntity
}: GetTenantListUseCaseParams) {
    return await GetTenantListRepository({
        paginationEntity
    });
}