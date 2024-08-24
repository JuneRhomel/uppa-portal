
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import DeleteMotherMeterWaterRepository from "../../data/repository/delete_mother_meter_water.repository";

export default async function DeleteMotherMeterWaterUseCase({ id }: { id: number }): Promise<Failure | String> {
    try {
        return await DeleteMotherMeterWaterRepository({ id });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}