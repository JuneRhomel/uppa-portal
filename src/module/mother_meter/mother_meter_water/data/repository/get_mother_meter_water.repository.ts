import { plainToInstance } from "class-transformer";
import Failure from "../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../util/failure_mapper/failure_mapper.util";
import MotherMeterWaterEntity from "../../domain/entity/mother_meter_water.entity";
import GetMotherMeterWaterDataSource from "../data_source/get_mother_meter_water.data_source";

export default async function GetMotherMeterWaterRepository({ id }: { id: number }): Promise<MotherMeterWaterEntity | Failure> {
    try {
        const response = await GetMotherMeterWaterDataSource({ id });
        const motherMeterWaterEntity = plainToInstance(MotherMeterWaterEntity, response, { excludeExtraneousValues: true });
        return motherMeterWaterEntity;
    } catch (error) {
        return FailureMapperUtil(error);
    }
}