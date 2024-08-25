import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import GetMotherMeterElectricityRepository from "../../data/repository/get_mother_meter_electricity.repository";
import MotherMeterElectricityEntity from "../entity/mother_meter_electricity.entity";

export default async function GetMotherMeterElectricityUseCase({ id }: { id: number }): Promise<MotherMeterElectricityEntity | Failure> {
    try {
        const response = await GetMotherMeterElectricityRepository({ id });

        if (response instanceof Failure) {
            return response;
        }

        return response;

    } catch (error) {

        return FailureMapperUtil(error);

    }

}