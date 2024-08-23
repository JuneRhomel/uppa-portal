
import ApiConstant from "../../../../../../application/constant/api.constant";
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util";
import PropertyTypeModel from "../model/property_type.model";

export default async function GetPropertyTypeDataSource(): Promise<
  PropertyTypeModel[] | Failure
> {
  try {
    const response = await HttpCliestUtil({
      method: "GET",
      url: ApiConstant.PROPERTY_TYPES,
    });

    if (response instanceof Failure) {
      return response;
    }

    return response;
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
