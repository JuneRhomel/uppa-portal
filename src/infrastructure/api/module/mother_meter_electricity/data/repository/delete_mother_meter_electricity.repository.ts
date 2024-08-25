import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import DeleteMotherMeterElectricityDataSource from "../data_source/delete_mother_meter_electricity.data_source";

export default async function DeleteMotherMeterElectricityRepository({ id }: { id: number }): Promise<Failure | void> {
    try {
        const response = await DeleteMotherMeterElectricityDataSource({ id });

        if (response instanceof Failure) {
            return response;
        }

        return response;

    } catch (error) {

        return FailureMapperUtil(error);

    }
}