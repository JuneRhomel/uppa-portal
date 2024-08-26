import { instanceToPlain, plainToInstance } from "class-transformer";
import ApiConstant from "../../../../../../application/constant/api.constant";
import Failure from "../../../../../../application/failure/failure";
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util";
import SubMeterWaterModel from "../model/sub_meter_water.model";

export default async function PostSubMeterWaterDataSource({ subMeterWaterModel }: { subMeterWaterModel: SubMeterWaterModel }): Promise<Failure | void> {
    const response = await HttpCliestUtil({
        method: "POST",
        url: ApiConstant.SUB_METER_ELECTRICITY,
        body: instanceToPlain(subMeterWaterModel),
    });

    if (response instanceof Failure) {
        return response;
    }

    return response
}