
import GetMotherMeterListWaterDataSource from "../data_source/get_mother_meter_water_list.data_source";
import MotherMeterWaterListEntity from "../../domain/entity/mother_meter_water_list.entity";
import { plainToInstance } from "class-transformer";
import Failure from "../../../../../../application/failure/failure";
import PaginationModel from "../../../../../../application/model/pagination.model";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import GetMotherMeterWaterRepositoryParams from "./interface/get_mother_meter_water_list_repository.params";

export default async function GetMotherMeterWaterListRepository(
    { paginationEntity }
        : GetMotherMeterWaterRepositoryParams):
    Promise<MotherMeterWaterListEntity | Failure> {
    try {
        const paginationModel = plainToInstance(PaginationModel, paginationEntity, { excludeExtraneousValues: true });
        const response = await GetMotherMeterListWaterDataSource({ paginationModel });
        return plainToInstance(MotherMeterWaterListEntity, response, { excludeExtraneousValues: true });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}