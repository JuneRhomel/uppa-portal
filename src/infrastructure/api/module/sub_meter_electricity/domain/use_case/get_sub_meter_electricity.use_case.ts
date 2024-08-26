import Failure from "../../../../../../application/failure/failure";
import GerSubMeterElectricityRepository from "../../data/repository/get_sub_meter_electricity.data_source";
import SubMeterElectricityEntity from "../entity/sub_meter_electricity.entity";

export default async function GetSubMeterElectricityUseCase({ id }: { id: number }): Promise<Failure | SubMeterElectricityEntity> {
    return await GerSubMeterElectricityRepository({ id })
}