import Failure from "../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../util/failure_mapper/failure_mapper.util";
import GetMotherMeterElectricityRepository from "../../data/repository/get_mother_meter_electricity.repository";
import MotherMeterElectricityListEntity from "../entity/mother_meter_electricity_list.entity";
import GetMotherMeterElectricityUseCaseParams from "./interface/get_mother_meter_electricity_use_case.params";

export default async function GetMotherMeterElectricityUseCase({ paginationEntity }: GetMotherMeterElectricityUseCaseParams): Promise<MotherMeterElectricityListEntity | Failure> {
    try {
        const response = await GetMotherMeterElectricityRepository({ paginationEntity });

        console.log(response);
        return response;
    } catch (error) {
        return FailureMapperUtil(error);
    }
}