import ApiConstant from "../../../../application/constant/api.constant";
import Failure from "../../../../application/failure/failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import HttpCliestUtil from "../../../../util/http_client/http_cliest.util";
import DeletePropertyDataSourceParams from "./interface/delete_property_data_source.params";

export default async function DeletePropertyDataSource({
  id,
}: DeletePropertyDataSourceParams): Promise<void | Failure> {
  try {
    const response = await HttpCliestUtil({
      method: "DELETE",
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
