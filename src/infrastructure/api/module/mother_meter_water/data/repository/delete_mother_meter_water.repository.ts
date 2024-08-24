
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import DeleteMotherMeterWaterDataSource from "../data_source/delete_mother_meter_water.data_source";

export default async function DeleteMotherMeterWaterRepository({ id }: { id: number }): Promise<Failure | String> {
    try {
        return await DeleteMotherMeterWaterDataSource({ id });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}