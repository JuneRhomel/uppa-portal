import { plainToInstance } from "class-transformer";

import MotherMeterWaterModel from "../model/mother_meter_water.model";
import ApiConstant from "../../../../../../application/constant/api.constant";
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util";

export default async function GetMotherMeterWaterDataSource({ id }: { id: number }): Promise<MotherMeterWaterModel | Failure> {
    try {
        const response = await HttpCliestUtil({
            method: "GET",
            url: `${ApiConstant.MOTHER_METER_WATER}/${id}`,
        });

        const motherMeterWaterModel = plainToInstance(MotherMeterWaterModel, response as Object, {
            excludeExtraneousValues: true
        });

        return motherMeterWaterModel;
    } catch (error) {
        return FailureMapperUtil(error);
    }
}