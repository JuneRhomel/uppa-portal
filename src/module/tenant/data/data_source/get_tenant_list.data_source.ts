import { plainToInstance } from "class-transformer";
import ApiConstant from "../../../../application/constant/api.constant";
import Failure from "../../../../application/failure/failure";
import HttpCliestUtil from "../../../../util/http_client/http_cliest.util";
import GetTenantListDataSourceParams from "./interface/get_tenant_list_data_source.params";
import TenantListModel from "../model/tenant_list.model";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";

export default async function GetTenantListDataSource({
    paginationModel
}: GetTenantListDataSourceParams):
    Promise<TenantListModel | Failure> {
    try {
        const { search, page, numberOfRows, columns, sortBy, sortOrder, filters } =
            paginationModel;

        const response = HttpCliestUtil({
            method: "GET",
            url: `${ApiConstant.TENANTS}?search=${search}&page=${page}&numberOfRows=${numberOfRows}&columns=${columns}&sortBy=${sortBy}&sortOrder=${sortOrder}&filters=${filters}`,
        });

        if (response instanceof Failure) {
            return response;
        }
        const ss = plainToInstance(TenantListModel, response as object, {
            excludeExtraneousValues: true,
        });

        return ss;

    } catch (error) {
        return FailureMapperUtil(error);
    }

}