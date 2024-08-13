import { plainToInstance } from "class-transformer";
import Failure from "../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../util/failure_mapper/failure_mapper.util";
import GetMotherMeterWaterRepositoryParams from "./interface/get_mother_meter_water_repository.params";
import PaginationModel from "../../../../../application/model/pagination.model";
import GetMotherMeterWaterDataSource from "../data_source/get_mother_meter_water.data_source";
import MotherMeterWaterListEntity from "../../domain/entity/mother_meter_water_list.entity";

export default async function GetMotherMeterWaterRepository(
    { paginationEntity }
        : GetMotherMeterWaterRepositoryParams):
    Promise<MotherMeterWaterListEntity | Failure> {
    try {
        const paginationModel = plainToInstance(PaginationModel, paginationEntity, { excludeExtraneousValues: true });
        const response = await GetMotherMeterWaterDataSource({ paginationModel });
        return plainToInstance(MotherMeterWaterListEntity, response, { excludeExtraneousValues: true });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}