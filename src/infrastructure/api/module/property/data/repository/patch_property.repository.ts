import { plainToInstance } from "class-transformer";

import PatchPropertyDataSource from "../data_source/patch_property.data_source";
import PatchPropertyRepositoryParams from "./interface/patch_property.params";
import PropertiesModel from "../model/properties.model";
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";

export default async function PatchPropertyRepository({
  propertyEntity,
}: PatchPropertyRepositoryParams): Promise<void | Failure> {
  try {
    const property = {
      id: propertyEntity.id,
      unit_name: propertyEntity.unit_name,
      unit_type_id: propertyEntity.unit_type_id,
      unit_status_id: propertyEntity.unit_status_id,
    };
    const propertyModel = plainToInstance(PropertiesModel, property, {
      excludeExtraneousValues: true,
    });
    const response = await PatchPropertyDataSource({ propertyModel });
    if (response instanceof Failure) {
      return response;
    }
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
