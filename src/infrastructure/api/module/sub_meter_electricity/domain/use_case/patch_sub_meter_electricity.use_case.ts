import { validate } from "class-validator";
import ValidationFailure from "../../../../../../application/failure/validation.failure";
import PatchSubMeterElectricitRepository from "../../data/repository/patch_sub_meter_electricity.repository";
import Failure from "../../../../../../application/failure/failure";
import SubMeterElectricityEntity from "../entity/sub_meter_electricity.entity";

export default async function PatchSubMeterElectricityUseCase({ subMeterElectricityEntity }: { subMeterElectricityEntity: SubMeterElectricityEntity }): Promise<Failure | void> {
    const validationError = await validate(subMeterElectricityEntity);

    if (validationError.length > 0) {
        return new ValidationFailure(validationError);
    }

    return await PatchSubMeterElectricitRepository({ subMeterElectricityEntity })
}