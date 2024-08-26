import { validate } from "class-validator";
import Failure from "../../../../../../application/failure/failure";
import PatchSubMeterWaterRepository from "../../data/repository/patch_sub_meter_water.repository";
import SubMeterWaterEntity from "../entity/sub_meter_water.entity";
import ValidationFailure from "../../../../../../application/failure/validation.failure";

export default async function PatchSubMeterWaterUseCase({ subMeterWaterEntity }: { subMeterWaterEntity: SubMeterWaterEntity }): Promise<Failure | void> {
    
    const validationError = await validate(subMeterWaterEntity);

    if (validationError.length > 0) {
        return new ValidationFailure(validationError);
    }

    return await PatchSubMeterWaterRepository({ subMeterWaterEntity });
}