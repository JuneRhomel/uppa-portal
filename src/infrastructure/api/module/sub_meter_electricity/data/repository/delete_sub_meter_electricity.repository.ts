import Failure from "../../../../../../application/failure/failure";
import DeleteSubMeterElectricityDataSource from "../data_source/delete_sub_meter_electricity.data_source";

export default async function DeleteSubMeterElectricityRepository({ id }: { id: number }): Promise<Failure | void> {
    return await DeleteSubMeterElectricityDataSource({ id })
}