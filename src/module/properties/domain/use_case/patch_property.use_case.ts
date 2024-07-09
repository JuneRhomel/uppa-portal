import Failure from "../../../../application/failure/failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import PatchPropertyRepository from "../../data/repository/patch_property.repository";
import { validate } from "class-validator";
import PatchPropertyUseCaseParams from "./interface/patch_property.use_case";
import ValidationFailure from "../../../../application/failure/validation.failure";

export default async function PatchPropertyUseCase({
  propertyEntity,
}: PatchPropertyUseCaseParams): Promise<void | Failure> {
  try {
    const validateErrors = await validate(propertyEntity);

    if (validateErrors.length > 0) {
      return new ValidationFailure(validateErrors);
    }
    return await PatchPropertyRepository({ propertyEntity });
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
