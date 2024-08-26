import Failure from "../../../../../../application/failure/failure";
import DeleteSubMeterWaterDataSource from "../data_source/delete_sub_meter_water.data_source";

export default async function DeleteSubMeterWaterRepository({ id }: { id: number }): Promise<Failure | void> {
    return await DeleteSubMeterWaterDataSource({ id })
}