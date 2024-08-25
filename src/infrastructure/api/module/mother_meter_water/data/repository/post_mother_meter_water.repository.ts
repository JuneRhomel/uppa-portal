import { plainToClass } from "class-transformer";

import PostMotherMeterWaterDataSource from "../data_source/post_meter_meter_water.data_source";
import PostMotherMeterWaterRepositoryParams from "./interface/post_mother_meter_water_repository.params";
import MotherMeterWaterModel from "../model/mother_meter_water.model";
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";

export default async function PostMotherMeterWaterRepository({
    motherMeterWaterEntity
}: PostMotherMeterWaterRepositoryParams): Promise<Failure | String> {
    try {
        const motherMeterWaterModel = plainToClass(MotherMeterWaterModel, motherMeterWaterEntity, {
            excludeExtraneousValues: true
        });

        const response = await PostMotherMeterWaterDataSource({
            motherMeterWaterModel
        });

        if (response instanceof Failure) {
            return FailureMapperUtil(response);
        }

        return response;

    } catch (error) {
        return FailureMapperUtil(error);
    }
}