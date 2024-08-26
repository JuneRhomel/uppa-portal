import { plainToInstance } from "class-transformer";
import PaginationEntity from "../../../../../../application/entity/pagination.entity";
import SubMeterWaterListModel from "../model/sub_meter_water_list.model";
import PaginationModel from "../../../../../../application/model/pagination.model";
import SubMeterWaterListEntity from "../../domain/entity/sub_meter_water_list.entity";
import GetSubMeterWaterListDataSource from "../data_source/get_sub_meter_water_list.data_source";
import Failure from "../../../../../../application/failure/failure";

export default async function GetSubMeterWaterListRepository({ paginationEntity }: { paginationEntity: PaginationEntity }): Promise<Failure | SubMeterWaterListModel> {
    const paginationModel = plainToInstance(PaginationModel, paginationEntity, {
        excludeExtraneousValues: true
    });

    const response = await GetSubMeterWaterListDataSource({ paginationModel });

    if (response instanceof Failure) return response

    return plainToInstance(SubMeterWaterListEntity, response, {
        excludeExtraneousValues: true
    })
}