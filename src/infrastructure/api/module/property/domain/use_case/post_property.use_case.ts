import { validate } from "class-validator";

import PostPropertyRepository from "../../data/repository/post_property.repository";
import PostPropertiesTableHeaderParams from "./interface/post_property_use_case.params";
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import ValidationFailure from "../failure/validation";


export default async function PostPropertyUseCase({
  propertyEntity,
}: PostPropertiesTableHeaderParams): Promise<void | Failure> {
  try {
    const validateErrors = await validate(propertyEntity);
    if (validateErrors.length > 0) {
      return new ValidationFailure({ extra: validateErrors });
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
