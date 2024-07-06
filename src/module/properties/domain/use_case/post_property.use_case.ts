import { validate } from "class-validator";
import Failure from "../../../../application/failure/failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import PostPropertyRepository from "../../data/repository/post_property.repository";
import PostPropertiesTableHeaderParams from "./interface/post_property_use_case.params";
import ValidationFailure from "../../../../application/failure/validation.failure";

export default async function PostPropertyUseCase({
  propertyEntity,
}: PostPropertiesTableHeaderParams): Promise<void | Failure> {
  try {
    const validateErrors = await validate(propertyEntity);
    if (validateErrors.length > 0) {
      return new ValidationFailure(validateErrors);
    }

    const response = await PostPropertyRepository({
      propertyEntity,
    });
    

    if (response instanceof Failure) {
      return response;
    }

  } catch (error) {
    return FailureMapperUtil(error);
  }
}
