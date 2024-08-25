import { plainToInstance } from "class-transformer";
import Failure from "../../../../../../application/failure/failure";
import MotherMeterElectricityEntity from "../../domain/entity/mother_meter_electricity.entity";
import GetMotherMeterElectricityDataSource from "../data_source/get_mother_meter_electricity.data_source";
import MotherMeterElectricityModel from "../model/mother_meter_electricity.model";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";

export default async function GetMotherMeterElectricityRepository({ id }: { id: number }): Promise<Failure | MotherMeterElectricityEntity> {
    try {

        const response = await GetMotherMeterElectricityDataSource({ id });

        return plainToInstance(MotherMeterElectricityEntity, response, {
            excludeExtraneousValues: true
        });

    } catch (error) {

        return FailureMapperUtil(error);
    }
}