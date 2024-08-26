import { validate } from "class-validator";
import Failure from "../../../../../../application/failure/failure";
import ValidationFailure from "../../../../../../application/failure/validation.failure";
import PostSubMeterElectricityRepository from "../../data/repository/post_sub_meter_electricity.repository";
import SubMeterElectricityEntity from "../entity/sub_meter_electricity.entity";

export default async function PostSubMeterElectricityUseCase({ subMeterElectricityEntity }: { subMeterElectricityEntity: SubMeterElectricityEntity }): Promise<Failure | void> {
    const validationError = await validate(subMeterElectricityEntity);
    if (validationError.length > 0) {
        return new ValidationFailure(validationError);
    }

    return await PostSubMeterElectricityRepository({ subMeterElectricityEntity })
}