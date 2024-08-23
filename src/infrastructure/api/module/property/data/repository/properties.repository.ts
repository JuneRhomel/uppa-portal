
import Failure from "../../../../../../application/failure/failure";
import PaginationModel from "../../../../../../application/model/pagination.model";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import ListPropertiesEntity from "../../domain/entity/list_properties.entity";
import PropertiesDataSource from "../data_source/properties.data_source";
import PropertiesRepositoryParams from "./interface/properties_repository.params";

export default async function PropertiesRepository({
  paginationEntity,
}: PropertiesRepositoryParams): Promise<ListPropertiesEntity | Failure> {
  try {
    const paginationModel = new PaginationModel(
      paginationEntity.search,
      paginationEntity.page,
      paginationEntity.numberOfRows,
      paginationEntity.columns,
      paginationEntity.sortBy,
      paginationEntity.sortOrder,
      paginationEntity.filters
    );

    const response = await PropertiesDataSource({
      paginationModel,
    });

    if (response instanceof Failure) {
      return response;
    }

    return new ListPropertiesEntity(response.properties, response.totalRows);
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
