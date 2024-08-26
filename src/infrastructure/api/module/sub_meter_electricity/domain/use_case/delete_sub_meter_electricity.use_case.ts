import Failure from "../../../../../../application/failure/failure";
import DeleteSubMeterElectricityRepository from "../../data/repository/delete_sub_meter_electricity.repository";

export default async function DeleteSubMeterElectricityUseCase({ id }: { id: number }): Promise<Failure | void> {
    return await DeleteSubMeterElectricityRepository({ id })
}