import { plainToInstance } from "class-transformer";
import Failure from "../../../../../../application/failure/failure";
import GetSubMeterWaterDataSource from "../data_source/get_sub_meter_water.data_source";
import SubMeterWaterModel from "../model/sub_meter_water.model";
import SubMeterWaterEntity from "../../domain/entity/sub_meter_water.entity";

export default async function GetSubMeterWaterRepository({ id }: { id: number }): Promise<Failure | SubMeterWaterModel> {
    const subMeterWaterModel = await GetSubMeterWaterDataSource({ id });

    return plainToInstance(SubMeterWaterEntity, subMeterWaterModel, {
        excludeExtraneousValues: true
    })
}