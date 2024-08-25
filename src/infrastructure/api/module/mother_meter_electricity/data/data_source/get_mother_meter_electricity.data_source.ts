import { plainToInstance } from "class-transformer";
import ApiConstant from "../../../../../../application/constant/api.constant";
import PaginationEntity from "../../../../../../application/entity/pagination.entity";
import Failure from "../../../../../../application/failure/failure";
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util";
import MotherMeterElectricityModel from "../model/mother_meter_electricity.model";

export default async function GetMotherMeterElectricityDataSource({ id }: { id: number }): Promise<MotherMeterElectricityModel | Failure> {
    const response = await HttpCliestUtil(
        {
            method: "GET",
            url: `${ApiConstant.MOTHER_METER_ELECTRICITY}/${id}`,
        }
    )
    if (response instanceof Failure) {
        return response;
    }
    return plainToInstance(MotherMeterElectricityModel, response as object, {
        excludeExtraneousValues: true
    });
}