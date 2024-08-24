import { classToPlain } from "class-transformer";
import ApiConstant from "../../../../../../application/constant/api.constant";
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util";
import PostMotherMeterWaterDataSourceParams from "./interface/post_meter_meter_water_data_source.params";

export default async function PostMotherMeterWaterDataSource({
    motherMeterWaterModel
}: PostMotherMeterWaterDataSourceParams): Promise<Failure | String> {
    try {
        const response = await HttpCliestUtil({
            method: "POST",
            url: ApiConstant.MOTHER_METER_WATER,
            body: classToPlain(motherMeterWaterModel)
        });

        return response;
    } catch (error) {
        return FailureMapperUtil(error);
    }
}