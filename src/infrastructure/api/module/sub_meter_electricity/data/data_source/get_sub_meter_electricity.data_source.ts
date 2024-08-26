import { plainToInstance } from "class-transformer";
import ApiConstant from "../../../../../../application/constant/api.constant";
import Failure from "../../../../../../application/failure/failure";
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util";
import SubMeterElectricityModel from "../model/sub_meter_electricity.model";

export default async function GetSubMeterElectricityDataSource({ id }: { id: number }): Promise<Failure | SubMeterElectricityModel> {
    const response = await HttpCliestUtil({
        method: "GET",
        url: `${ApiConstant.SUB_METER_ELECTRICITY}/${id}`,
    });

    if (response instanceof Failure) {
        return response;
    }

    return plainToInstance(SubMeterElectricityModel, response as object, {
        excludeExtraneousValues: true
    });
}