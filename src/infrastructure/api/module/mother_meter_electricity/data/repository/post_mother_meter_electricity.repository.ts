import { plainToInstance } from "class-transformer";
import PostMotherMeterElectricityListDataSource from "../data_source/post_mother_meter_electicity.data_source";
import PostMotherMeterElectricityRepositoryParams from "./interface/post_mother_meter_electricity_repository.params";
import MotherMeterElectricityModel from "../model/mother_meter_electricity.model";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import Failure from "../../../../../../application/failure/failure";

export default async function PostMotherMeterElectricityRepository({ motherMeterElectricityEntity }: PostMotherMeterElectricityRepositoryParams) {

    const motherMeterElectricityModel = plainToInstance(MotherMeterElectricityModel, motherMeterElectricityEntity, {
        excludeExtraneousValues: true
    });

    const response = await PostMotherMeterElectricityListDataSource({ motherMeterElectricityModel });

    if (response instanceof Failure) {
        return FailureMapperUtil(response);
    }

    return response
}