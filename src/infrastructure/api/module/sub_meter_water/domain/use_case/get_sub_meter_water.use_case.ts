import Failure from "../../../../../../application/failure/failure";
import SubMeterWaterModel from "../../data/model/sub_meter_water.model";
import GetSubMeterWaterRepository from "../../data/repository/get_sub_meter_water.repository";

export default async function GetSubMeterWaterUseCase({ id }: { id: number }): Promise<Failure | SubMeterWaterModel> {
    return await GetSubMeterWaterRepository({ id });
}