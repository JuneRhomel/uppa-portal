import { validate } from "class-validator";
import Failure from "../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../util/failure_mapper/failure_mapper.util";
import PostMotherMeterWaterUseCaseParams from "./interface/post_mother_meter_water_use_case.params";
import ValidationFailure from "../../../../../application/failure/validation.failure";
import PostMotherMeterWaterRepository from "../../data/repository/post_mother_meter_water.repository";

export default async function PostMotherMeterWaterUseCase({ motherMeterWaterEntity }: PostMotherMeterWaterUseCaseParams): Promise<Failure | String> {
    try {
        const validateErrors = await validate(motherMeterWaterEntity);

        if (validateErrors.length > 0) {
            return new ValidationFailure(validateErrors);
        }

        return await PostMotherMeterWaterRepository({ motherMeterWaterEntity });

    } catch (error) {
        return FailureMapperUtil(error);
    }
}