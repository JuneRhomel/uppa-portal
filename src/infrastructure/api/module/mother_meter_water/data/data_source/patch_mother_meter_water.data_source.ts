import { classToPlain } from "class-transformer";
import ApiConstant from "../../../../../../application/constant/api.constant";
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util";
import MotherMeterWaterModel from "../model/mother_meter_water.model";

export default async function PatchMotherMeterWaterDataSource({ motherMeterWaterModel }: {
    motherMeterWaterModel: MotherMeterWaterModel
}): Promise<string | Failure> {
    console.log(motherMeterWaterModel);

    const response = await HttpCliestUtil({
        method: "PATCH",
        url: `${ApiConstant.MOTHER_METER_WATER}/${motherMeterWaterModel.id}`,
        body: classToPlain(motherMeterWaterModel)
    })
    if (response instanceof Failure) {
        return FailureMapperUtil(response);
    }

    return "success"
}