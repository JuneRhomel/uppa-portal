
import ApiConstant from "../../../../../../application/constant/api.constant";
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util";
import PropertiesModel from "../model/properties.model";
import GetPropertyDataSourceParams from "./interface/get_property_data_source.params";

export default async function GetPropertyDataSource({
  id,
}: GetPropertyDataSourceParams): Promise<PropertiesModel | Failure> {
  try {
    const response = await HttpCliestUtil({
      method: "GET",
      url: `${ApiConstant.PROPERTIES}/${id}`,
    });

    if (response instanceof Failure) {
      return response;
    }

    return response;
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
