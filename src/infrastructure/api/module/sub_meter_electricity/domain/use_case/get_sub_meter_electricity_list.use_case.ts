import PaginationEntity from "../../../../../../application/entity/pagination.entity";
import Failure from "../../../../../../application/failure/failure";
import SubMeterElectricityListModel from "../../data/model/sub_meter_electricity_list.model";
import GetSubMeterElectricityListRepository from "../../data/repository/get_sub_meter_electricity_list.repository";

export default async function GetSubMeterElectricityListUseCase({ paginationEntity }: { paginationEntity: PaginationEntity }): Promise<Failure | SubMeterElectricityListModel> {
    return await GetSubMeterElectricityListRepository({ paginationEntity })
}