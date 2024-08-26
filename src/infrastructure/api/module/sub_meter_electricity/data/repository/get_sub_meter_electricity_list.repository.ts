import { plainToInstance } from "class-transformer";
import PaginationEntity from "../../../../../../application/entity/pagination.entity";
import Failure from "../../../../../../application/failure/failure";
import PaginationModel from "../../../../../../application/model/pagination.model";
import SubMeterElectricityListModel from "../model/sub_meter_electricity_list.model";
import SubMeterElectricityListEntity from "../../domain/entity/sub_meter_electricity_list.entity";
import GetSubMeterElectricityListDataSource from "../data_source/get_sub_meter_electricity_list.data_source";

export default async function GetSubMeterElectricityListRepository({ paginationEntity }: { paginationEntity: PaginationEntity }): Promise<Failure | SubMeterElectricityListModel> {
    const paginationModel = plainToInstance(PaginationModel, paginationEntity, {
        excludeExtraneousValues: true
    })

    const response = await GetSubMeterElectricityListDataSource({ paginationModel });

    if (response instanceof Failure) return response

    return plainToInstance(SubMeterElectricityListEntity, response, {
        excludeExtraneousValues: true
    })
}