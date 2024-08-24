
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import GetMotherMeterElectricityListRepository from "../../data/repository/get_mother_meter_electricity_list.repository";
import MotherMeterElectricityListEntity from "../entity/mother_meter_electricity_list.entity";
import GetMotherMeterElectricityListUseCaseParams from "./interface/get_mother_meter_electricity_list_use_case.params";

export default async function GetMotherMeterElectricityListUseCase({ paginationEntity }: GetMotherMeterElectricityListUseCaseParams): Promise<MotherMeterElectricityListEntity | Failure> {
    try {
        const response = await GetMotherMeterElectricityListRepository({ paginationEntity });

        return response;
    } catch (error) {
        return FailureMapperUtil(error);
    }
}