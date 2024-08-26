import { plainToInstance } from "class-transformer";
import Failure from "../../../../../../application/failure/failure";
import SubMeterElectricityEntity from "../../domain/entity/sub_meter_electricity.entity";
import SubMeterElectricityModel from "../model/sub_meter_electricity.model";
import PostSubMeterElectricityDataSource from "../data_source/post_sub_meter_electricity.data_source";

export default async function PostSubMeterElectricityRepository({ subMeterElectricityEntity }: { subMeterElectricityEntity: SubMeterElectricityEntity }): Promise<Failure | void> {
    const subMeterElectricityModel = plainToInstance(SubMeterElectricityModel, subMeterElectricityEntity, {
        excludeExtraneousValues: true
    })

    return await PostSubMeterElectricityDataSource({ subMeterElectricityModel })
}