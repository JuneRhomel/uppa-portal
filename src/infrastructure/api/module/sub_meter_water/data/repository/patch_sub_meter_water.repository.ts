import { plainToInstance } from "class-transformer";
import Failure from "../../../../../../application/failure/failure";
import SubMeterWaterEntity from "../../domain/entity/sub_meter_water.entity";
import SubMeterWaterModel from "../model/sub_meter_water.model";
import PatchSubMeterWaterDataSource from "../data_source/patch_sub_meter_water.data_source";

export default async function PatchSubMeterWaterRepository({ subMeterWaterEntity }: { subMeterWaterEntity: SubMeterWaterEntity }): Promise<Failure | void> {
    const subMeterWaterModel = plainToInstance(SubMeterWaterModel, subMeterWaterEntity, {
        excludeExtraneousValues: true
    })

    return await PatchSubMeterWaterDataSource({ subMeterWaterModel })
}