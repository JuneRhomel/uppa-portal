import { plainToInstance } from "class-transformer";
import Failure from "../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../util/failure_mapper/failure_mapper.util";
import MotherMeterElecticityListEntity from "../../domain/entity/mother_meter_electricity_list.entity";
import GetMotherMeterElecticityDataSource from "../data_source/get_mother_meter_electricity.data_source";
import GetMotherMeterElecticityRepositoryParams from "./interface/get_mother_meter_electricity_repository.params";

export default async function GetMotherMeterElecticityRepository({ paginationEntity }: GetMotherMeterElecticityRepositoryParams): Promise<MotherMeterElecticityListEntity | Failure> {
    try {

        const response = await GetMotherMeterElecticityDataSource({ paginationModel: paginationEntity });

        return plainToInstance(MotherMeterElecticityListEntity, response, {
            excludeExtraneousValues: true
        });

    } catch (error) {

        return FailureMapperUtil(error);
    }
}