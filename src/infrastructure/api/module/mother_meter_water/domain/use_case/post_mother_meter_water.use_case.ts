import { validate } from "class-validator";
import PostMotherMeterWaterRepository from "../../data/repository/post_mother_meter_water.repository";
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import PostMotherMeterWaterUseCaseParams from "./interface/post_mother_meter_water_use_case.params";
import ValidationFailure from "../../../../../../application/failure/validation.failure";

export default async function PostMotherMeterWaterUseCase({ motherMeterWaterEntity }: PostMotherMeterWaterUseCaseParams): Promise<Failure | String> {
    try {
        const validateErrors = await validate(motherMeterWaterEntity);

        if (validateErrors.length > 0) {
            return new ValidationFailure(validateErrors);
        }

        const response = await PostMotherMeterWaterRepository({ motherMeterWaterEntity });

        return response

    } catch (error) {
        return FailureMapperUtil(error);
    }
}