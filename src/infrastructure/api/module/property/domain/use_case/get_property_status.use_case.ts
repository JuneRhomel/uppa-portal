
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import GetPropertyStatusDataSource from "../../data/data_source/get_property_status.data_source";
import PropertyStatUsEntity from "../entity/property_status.entity";

export default async function GetPropertyStatusUseCase(): Promise<
  PropertyStatUsEntity[] | Failure
> {
  try {
    return await GetPropertyStatusDataSource();
  } catch (error) {
    return FailureMapperUtil(error);
  }
}
