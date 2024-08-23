
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import PostPropertyDataSource from "../data_source/post_property.data_source";
import PropertiesModel from "../model/properties.model";
import PostPropertyRepositoryParams from "./interface/post_property_repository.params";

export default async function PostPropertyRepository({
  propertyEntity,
}: PostPropertyRepositoryParams): Promise<void | Failure> {
    try {
    const propertyModel = new PropertiesModel(
      propertyEntity.id,
      propertyEntity.unit_name,
      propertyEntity.unit_type_id,
      propertyEntity.unit_type_name,
      propertyEntity.unit_status_id,
      propertyEntity.unit_status_name,
      propertyEntity.created_at,
      propertyEntity.updated_at,
      propertyEntity.deleted_at,
      propertyEntity.created_by,
      propertyEntity.deleted_by,
      propertyEntity.updated_by
    );

    const response = await PostPropertyDataSource({
      propertyModel,
    });

    if (response instanceof Failure) {
      return response;
    }

  } catch (error) {
    return FailureMapperUtil(error);
  }
}
