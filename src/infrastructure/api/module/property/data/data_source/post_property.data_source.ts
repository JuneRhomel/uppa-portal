
import ApiConstant from "../../../../../../application/constant/api.constant";
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util";
import PostPropertyDataSourceParams from "./interface/post_property_data_source.params";

export default async function PostPropertyDataSource({
  propertyModel,
}: PostPropertyDataSourceParams): Promise<void | Failure> {
  try {
    const body = {
      unit_name: propertyModel.unit_name,
      unit_type_id: propertyModel.unit_type_id,
      unit_status_id: propertyModel.unit_status_id,
    };

    const response = await HttpCliestUtil({
      method: "POST",
      url: ApiConstant.PROPERTIES,
      body: body,
    });


    if (response instanceof Failure) {
      return response;
    }
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
