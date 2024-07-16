import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import PatchPropertyTypeDataSource from "../data_source/patch_property_type.data_source";
import PropertyTypeModel from "../model/property_type.model";
import PatchPropertyTypeDataSourceParams from "./interface/patch_property_type_repository.params";
import { plainToInstance } from "class-transformer";

export default async function PatchPropertyTypeRepository({
  propertyTypeEntity,
}: PatchPropertyTypeDataSourceParams) {
  try {
    const propertyTypeModel = plainToInstance(
      PropertyTypeModel,
      propertyTypeEntity,
      {
        excludeExtraneousValues: true,
      }
    );

    return await PatchPropertyTypeDataSource({ propertyTypeModel });
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
