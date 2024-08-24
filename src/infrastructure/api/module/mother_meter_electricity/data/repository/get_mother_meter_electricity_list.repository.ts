import { plainToInstance } from "class-transformer";
import MotherMeterElecticityListEntity from "../../domain/entity/mother_meter_electricity_list.entity";
import GetMotherMeterElecticityListDataSource from "../data_source/get_mother_meter_electricity_list.data_source";
import GetMotherMeterElecticityRepositoryListParams from "./interface/get_mother_meter_electricity_list_repository.params";
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";

export default async function GetMotherMeterElecticityListRepository({ paginationEntity }: GetMotherMeterElecticityRepositoryListParams): Promise<MotherMeterElecticityListEntity | Failure> {
    try {

        const response = await GetMotherMeterElecticityListDataSource({ paginationModel: paginationEntity });

        return plainToInstance(MotherMeterElecticityListEntity, response, {
            excludeExtraneousValues: true
        });

    } catch (error) {

        return FailureMapperUtil(error);
    }
}