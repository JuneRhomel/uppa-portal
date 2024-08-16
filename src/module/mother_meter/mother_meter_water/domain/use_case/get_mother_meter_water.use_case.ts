import Failure from "../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../util/failure_mapper/failure_mapper.util";
import GetMotherMeterWaterRepository from "../../data/repository/get_mother_meter_water.repository";
import MotherMeterWaterEntity from "../entity/mother_meter_water.entity";

export default async function GetMotherMeterWaterUseCase({
    id }: { id: number }): Promise<MotherMeterWaterEntity | Failure> {
    try {
        return await GetMotherMeterWaterRepository({ id });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}