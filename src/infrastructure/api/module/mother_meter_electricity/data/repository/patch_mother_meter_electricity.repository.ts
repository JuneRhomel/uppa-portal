import { plainToInstance } from "class-transformer";
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import MotherMeterElectricityEntity from "../../domain/entity/mother_meter_electricity.entity";
import MotherMeterElectricityModel from "../model/mother_meter_electricity.model";
import PatchMotherMeterElectricityDataSource from "../data_source/patch_mother_meter_electricity.data-source";

export default async function PatchMotherMeterElectricityRepository({ motherMeterElectricityEntity }: { motherMeterElectricityEntity: MotherMeterElectricityEntity }): Promise<Failure | void> {

    const motherMeterElectricityModel = plainToInstance(MotherMeterElectricityModel, motherMeterElectricityEntity, {
        excludeExtraneousValues: true
    })
    const response = await PatchMotherMeterElectricityDataSource({ motherMeterElectricityModel });

    if (response instanceof Failure) {
        return FailureMapperUtil(response);
    }

    return response;
}

