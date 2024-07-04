import { plainToInstance } from "class-transformer";
import ApiConstant from "../../../../application/constant/api.constant";
import Failure from "../../../../application/failure/failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import HttpCliestUtil from "../../../../util/http_client/http_cliest.util";
import PropertiesDataSourceParams from "./interface/properties_data_source.params";
import ListPropertiesModel from "../model/list_properties.model";

export default async function PropertiesDataSource({
  paginationModel,
}: PropertiesDataSourceParams): Promise<ListPropertiesModel | Failure> {
  try {
    const { search, page, numberOfRows, columns, sortBy, sortOrder, filters } =
      paginationModel;
    const response = await HttpCliestUtil({
      method: "GET",
      url: `${ApiConstant.PROPERTIES}?search=${search}&page=${page}&numberOfRows=${numberOfRows}&columns=${columns}&sortBy=${sortBy}&sortOrder=${sortOrder}&filters=${filters}`,
    });

    if (response instanceof Failure) {
      return response;
    }
    console.log(response);

    const ss = plainToInstance(ListPropertiesModel, response as object, {
      excludeExtraneousValues: true,
    });
    return ss;
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
