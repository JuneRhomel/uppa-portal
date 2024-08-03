import Failure from "../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../util/failure_mapper/failure_mapper.util";
import GetMotherMeterWaterRepository from "../../data/repository/get_mother_meter_water.repository";
import MotherMeterWaterListEntity from "../entity/mother_meter_water_list.entity";
import GetMotherMeterWaterUseCaseParams from "./interface/get_mother_meter_water_use_case.params";

export default async function GetMotherMeterWaterUseCase(
    { paginationEntity }: GetMotherMeterWaterUseCaseParams): Promise<MotherMeterWaterListEntity | Failure> {
    try {
        return await GetMotherMeterWaterRepository({ paginationEntity });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}