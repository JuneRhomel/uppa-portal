
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import GetMotherMeterWaterListRepository from "../../data/repository/get_mother_meter_water_list.repository";
import MotherMeterWaterListEntity from "../entity/mother_meter_water_list.entity";
import GetMotherMeterWaterListUseCaseParams from "./interface/get_mother_meter_water_list_use_case.params";

export default async function GetMotherMeterWaterListUseCase(
    { paginationEntity }: GetMotherMeterWaterListUseCaseParams): Promise<MotherMeterWaterListEntity | Failure> {
    try {
        return await GetMotherMeterWaterListRepository({ paginationEntity });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}