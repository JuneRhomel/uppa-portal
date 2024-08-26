import PaginationEntity from "../../../../../../application/entity/pagination.entity";
import Failure from "../../../../../../application/failure/failure";
import SubMeterWaterListModel from "../../data/model/sub_meter_water_list.model";
import GetSubMeterWaterListRepository from "../../data/repository/get_sub_meter_water_list.repositor";

export default async function GetSubMeterWaterListUseCase({ paginationEntity }: { paginationEntity: PaginationEntity }): Promise<Failure | SubMeterWaterListModel> {
    return await GetSubMeterWaterListRepository({ paginationEntity });
}