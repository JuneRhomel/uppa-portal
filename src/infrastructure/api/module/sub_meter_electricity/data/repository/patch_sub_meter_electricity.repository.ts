import { plainToInstance } from "class-transformer"
import Failure from "../../../../../../application/failure/failure"
import SubMeterElectricityEntity from "../../domain/entity/sub_meter_electricity.entity"
import PatchSubMeterElectricityDataSource from "../data_source/patch_sub_meter_electricity.data_source"
import SubMeterElectricityModel from "../model/sub_meter_electricity.model"

export default async function PatchSubMeterElectricitRepository({ subMeterElectricityEntity }: { subMeterElectricityEntity: SubMeterElectricityEntity }): Promise<Failure | void> {
    const subMeterElectricityModel = plainToInstance(SubMeterElectricityModel, subMeterElectricityEntity, {
        excludeExtraneousValues: true
    })

    return await PatchSubMeterElectricityDataSource({ subMeterElectricityModel })
}