import { plainToInstance } from "class-transformer"
import Failure from "../../../../../../application/failure/failure"
import SubMeterWaterEntity from "../../domain/entity/sub_meter_water.entity"
import PostSubMeterWaterDataSource from "../data_source/post_sub_meter_water.data_source"
import SubMeterWaterModel from "../model/sub_meter_water.model"

export default async function PostSubMeterWaterRepository({ subMeterWaterEntity }: { subMeterWaterEntity: SubMeterWaterEntity }): Promise<Failure | void> {
    const subMeterWaterModel = plainToInstance(SubMeterWaterModel, subMeterWaterEntity, {
        excludeExtraneousValues: true
    })

    return await PostSubMeterWaterDataSource({ subMeterWaterModel })
}