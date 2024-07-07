import ApiConstant from "../../../../application/constant/api.constant";
import Failure from "../../../../application/failure/failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import HttpCliestUtil from "../../../../util/http_client/http_cliest.util";
import PropertyStatusModel from "../model/property_status.model";

export default async function GetPropertyStatusDataSource(): Promise<
  PropertyStatusModel[] | Failure
> {
  try {
    const response = await HttpCliestUtil({
      method: "GET",
      url: ApiConstant.PROPERTY_STATUS,
    });

    if (response instanceof Failure) {
      return response;
    }

    return response;
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
