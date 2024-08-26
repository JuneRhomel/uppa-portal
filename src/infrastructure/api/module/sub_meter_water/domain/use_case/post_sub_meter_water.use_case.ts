import { validate } from "class-validator";
import Failure from "../../../../../../application/failure/failure";
import ValidationFailure from "../../../../../../application/failure/validation.failure";
import PostSubMeterWaterRepository from "../../data/repository/post_sub_meter_water.repository";
import SubMeterWaterEntity from "../entity/sub_meter_water.entity";

export default async function PostSubMeterWaterUseCase({ subMeterWaterEntity }: { subMeterWaterEntity: SubMeterWaterEntity }): Promise<Failure | void> {
    const validationError = await validate(subMeterWaterEntity);
    
    if (validationError.length > 0) {
        return new ValidationFailure(validationError);
    }

    return await PostSubMeterWaterRepository({ subMeterWaterEntity });
}