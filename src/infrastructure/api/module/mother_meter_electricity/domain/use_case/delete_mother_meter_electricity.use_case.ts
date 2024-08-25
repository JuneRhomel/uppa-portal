import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import DeleteMotherMeterElectricityRepository from "../../data/repository/delete_mother_meter_electricity.repository";

export default async function DeleteMotherMeterElectricityUseCase({ id }: { id: number }): Promise<Failure | void> {
    try {
        const response = await DeleteMotherMeterElectricityRepository({ id });

        if (response instanceof Failure) {
            return response;
        }

        return response;

    } catch (error) {

        return FailureMapperUtil(error);

    }

}