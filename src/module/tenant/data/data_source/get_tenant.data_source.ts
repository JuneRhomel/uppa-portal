import { plainToInstance } from "class-transformer";
import ApiConstant from "../../../../application/constant/api.constant";
import Failure from "../../../../application/failure/failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import HttpCliestUtil from "../../../../util/http_client/http_cliest.util";
import TenantModel from "../model/tenant.model";
import GetTenantDataSourceParams from "./interface/get_tenant_data_source.params";

export default async function GetTenantDataSource({ id }: GetTenantDataSourceParams): Promise<TenantModel | Failure> {
    try {
        const response = await HttpCliestUtil({
            method: "GET",
            url: `${ApiConstant.TENANTS}/${id}`,
        });

        if (response instanceof Failure) {
            return response;
        }

        return plainToInstance(TenantModel, response as object, {
            excludeExtraneousValues: true
        })
    } catch (error) {
        return FailureMapperUtil(error);
    }
}