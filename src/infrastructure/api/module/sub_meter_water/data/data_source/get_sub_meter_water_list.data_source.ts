import { instanceToPlain, plainToInstance } from "class-transformer";
import ApiConstant from "../../../../../../application/constant/api.constant";
import Failure from "../../../../../../application/failure/failure";
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util";
import SubMeterWaterListModel from "../model/sub_meter_water_list.model";
import PaginationModel from "../../../../../../application/model/pagination.model";

export default async function GetSubMeterWaterListDataSource({ paginationModel }: { paginationModel: PaginationModel }): Promise<Failure | SubMeterWaterListModel> {
    const response = await HttpCliestUtil({
        method: "GET",
        url: ApiConstant.SUB_METER_ELECTRICITY,
        body: instanceToPlain(paginationModel),
    });

    if (response instanceof Failure) {
        return response;
    }

    return plainToInstance(SubMeterWaterListModel, response as object, {
        excludeExtraneousValues: true
    });
}