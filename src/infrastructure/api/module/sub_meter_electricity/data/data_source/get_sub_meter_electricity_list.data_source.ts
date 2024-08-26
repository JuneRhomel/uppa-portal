import { instanceToPlain, plainToInstance } from "class-transformer";
import ApiConstant from "../../../../../../application/constant/api.constant";
import PaginationEntity from "../../../../../../application/entity/pagination.entity";
import Failure from "../../../../../../application/failure/failure";
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util";
import SubMeterElectricityListModel from "../model/sub_meter_electricity_list.model";
import PaginationModel from "../../../../../../application/model/pagination.model";

export default async function GetSubMeterElectricityListDataSource({ paginationModel }: { paginationModel: PaginationModel }): Promise<Failure | SubMeterElectricityListModel> {
    const response = await HttpCliestUtil({
        method: "GET",
        url: ApiConstant.SUB_METER_ELECTRICITY,
        body: instanceToPlain(paginationModel)
    });

    if (response instanceof Failure) {
        return response;
    }

    return plainToInstance(SubMeterElectricityListModel, response as object, {
        excludeExtraneousValues: true
    });
}