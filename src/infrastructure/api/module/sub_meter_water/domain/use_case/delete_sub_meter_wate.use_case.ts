import Failure from "../../../../../../application/failure/failure";
import DeleteSubMeterWaterRepository from "../../data/repository/delete_sub_meter_water.repository";

export default async function DeleteSubMeterWaterUseCase({ id }: { id: number }): Promise<Failure | void> {
    return await DeleteSubMeterWaterRepository({ id });
}