import { instanceToPlain } from "class-transformer";
import ApiConstant from "../../../../../../application/constant/api.constant";
import Failure from "../../../../../../application/failure/failure";
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util";
import MotherMeterElectricityModel from "../model/mother_meter_electricity.model";

export default async function PatchMotherMeterWaterDataSource({ motherMeterElectricityModel }: { motherMeterElectricityModel: MotherMeterElectricityModel }): Promise<Failure | void> {
    const response = await HttpCliestUtil(
        {
            method: "PATCH",
            url: `${ApiConstant.MOTHER_METER_ELECTRICITY}/${motherMeterElectricityModel.id}`,
            body: instanceToPlain(motherMeterElectricityModel),
        }
    )
    if (response instanceof Failure) {
        return response;
    }
    return response;
}