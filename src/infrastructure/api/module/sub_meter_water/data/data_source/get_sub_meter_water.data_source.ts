import { plainToInstance } from "class-transformer";
import ApiConstant from "../../../../../../application/constant/api.constant";
import Failure from "../../../../../../application/failure/failure";
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util";
import SubMeterWaterModel from "../model/sub_meter_water.model";

export default async function GetSubMeterWaterDataSource({ id }: { id: number }): Promise<Failure | SubMeterWaterModel> {
    const response = await HttpCliestUtil({
        method: "GET",
        url: `${ApiConstant.SUB_METER_ELECTRICITY}/${id}`,
    });

    if (response instanceof Failure) {
        return response;
    }

    return plainToInstance(SubMeterWaterModel, response as object, {
        excludeExtraneousValues: true
    });
}