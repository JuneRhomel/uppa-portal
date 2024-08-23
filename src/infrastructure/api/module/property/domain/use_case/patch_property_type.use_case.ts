
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import PatchPropertyTypeRepository from "../../data/repository/patch_property_type.repository";
import PatchPropertyTypeUseCaseParams from "./interface/patch_property_type_use_case.params";

export default async function PatchPropertyTypeUseCase({
  propertyTypeEntity,
}: PatchPropertyTypeUseCaseParams): Promise<void | Failure> {
  try {
    return await PatchPropertyTypeRepository({ propertyTypeEntity });
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
