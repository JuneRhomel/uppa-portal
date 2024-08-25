import { validate } from "class-validator";
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import PatchMotherMeterElectricityRepository from "../../data/repository/patch_mother_meter_electricity.repository";
import MotherMeterElectricityEntity from "../entity/mother_meter_electricity.entity";
import ValidationFailure from "../../../../../../application/failure/validation.failure";

export default async function PatchMotherMeterElectricityUseCase({ motherMeterElectricityEntity }: { motherMeterElectricityEntity: MotherMeterElectricityEntity }): Promise<Failure | void> {
    try {
        const validationError = await validate(motherMeterElectricityEntity);

        if (validationError.length > 0) {
            return new ValidationFailure(validationError);
        }

        const response = await PatchMotherMeterElectricityRepository({ motherMeterElectricityEntity });

        if (response instanceof Failure) {
            return response;
        }

        return response;

    } catch (error) {

        return FailureMapperUtil(error);

    }

}