import Failure from "../../../../application/failure/failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import PropertyStatUsEntity from "../../domain/entity/property_status.entity";
import GetPropertyStatusDataSource from "../data_source/get_property_status.data_source";

export default async function GetPropertyStatusRepository(): Promise<PropertyStatUsEntity[] | Failure> {
    try {
        return await GetPropertyStatusDataSource();
    } catch (error) {
        return FailureMapperUtil(error);
    }
}