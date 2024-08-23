import { plainToInstance } from "class-transformer";
import Failure from "../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../util/failure_mapper/failure_mapper.util";
import MotherMeterWaterEntity from "../../domain/entity/mother_meter_water.entity";
import PatchMotherMeterWaterDataSource from "../data_source/patch_mother_meter_water.data_source";
import MotherMeterWaterModel from "../model/mother_meter_water.model";

export default async function PatchMotherMeterWaterRepository({ motherMeterWaterEntity }: {
    motherMeterWaterEntity: MotherMeterWaterEntity
}): Promise<string | Failure> {
    const motherMeterWaterModel = plainToInstance(MotherMeterWaterModel, motherMeterWaterEntity, {
        excludeExtraneousValues: true
    })
    console.log(motherMeterWaterModel);
    const response = await PatchMotherMeterWaterDataSource({ motherMeterWaterModel });
    if (response instanceof Failure) {
        return response
    }
    return response

}