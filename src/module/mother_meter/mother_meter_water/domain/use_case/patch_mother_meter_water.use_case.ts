import { validate } from "class-validator";
import Failure from "../../../../../application/failure/failure";
import ValidationFailure from "../../../../../application/failure/validation.failure";
import FailureMapperUtil from "../../../../../util/failure_mapper/failure_mapper.util";
import PatchMotherMeterWaterRepository from "../../data/repository/patch_mother_meter_water.repository";
import MotherMeterWaterEntity from "../entity/mother_meter_water.entity";

export default async function PatchMotherMeterWaterUseCase({ motherMeterWaterEntity }: {
    motherMeterWaterEntity: MotherMeterWaterEntity
}): Promise<string | Failure> {
    const validateErrors = await validate(motherMeterWaterEntity);

    if (validateErrors.length > 0) {
        throw new ValidationFailure(validateErrors);
    }
    return await PatchMotherMeterWaterRepository({ motherMeterWaterEntity });
}