import { validate } from "class-validator";

import PostMotherMeterElectricityUseCaseParams from "./interface/post_mother_meter_electricity_use_case.params";
import PostMotherMeterElectricityRepository from "../../data/repository/post_mother_meter_electricity.repository";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import ValidationFailure from "../../../property/domain/failure/validation";

export default async function PostMotherMeterElectricityUseCase({ motherMeterElectricityEntity }: PostMotherMeterElectricityUseCaseParams) {
    try {
        const validateErrors = await validate(motherMeterElectricityEntity);

        if (validateErrors.length > 0) {
            return new ValidationFailure({extra: validateErrors});
        }

        return await PostMotherMeterElectricityRepository({ motherMeterElectricityEntity });

    } catch (error) {

        return FailureMapperUtil(error);
    }
}