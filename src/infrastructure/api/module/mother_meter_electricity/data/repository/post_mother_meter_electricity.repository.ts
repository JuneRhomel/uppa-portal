import { plainToInstance } from "class-transformer";
import PostMotherMeterElectricityListDataSource from "../data_source/post_mother_meter_electicity.data_source";
import PostMotherMeterElectricityRepositoryParams from "./interface/post_mother_meter_electricity_repository.params";
import MotherMeterElectricityModel from "../model/mother_meter_electricity.model";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";

export default async function PostMotherMeterElectricityRepository({ motherMeterElectricityEntity }: PostMotherMeterElectricityRepositoryParams) {
    try {
        const motherMeterElectricityModel = plainToInstance(MotherMeterElectricityModel, motherMeterElectricityEntity, {
            excludeExtraneousValues: true
        });

        return await PostMotherMeterElectricityListDataSource({ motherMeterElectricityModel });

    } catch (error) {

        return FailureMapperUtil(error);
    }

}