import ApiConstant from "../../../../application/constant/api.constant";
import Failure from "../../../../application/failure/failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import HttpCliestUtil from "../../../../util/http_client/http_cliest.util";
import PatchPropertyTypeDataSourceParams from "./interface/patch_property_type_data_source.params";

export default async function PatchPropertyTypeDataSource({
  propertyTypeModel,
}: PatchPropertyTypeDataSourceParams): Promise<void | Failure> {
  try {
    const payload = {
      unit_type_name: propertyTypeModel.unit_type_name,
    };

    console.log(payload);
    const response = await HttpCliestUtil({
      method: "PATCH",
      url: `${ApiConstant.PROPERTY_TYPES}/${propertyTypeModel.id}`,
      body: payload,
    });

    if (response instanceof Failure) {
      return response;
    }
    return response;
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
