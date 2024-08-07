import { classToPlain } from "class-transformer";
import FailureMapperUtil from "../../../../../util/failure_mapper/failure_mapper.util";
import HttpCliestUtil from "../../../../../util/http_client/http_cliest.util";
import PostMotherMeterElectricityDataSourceParams from "./interface/post_mother_meter_electicity_data_source.params";
import ApiConstant from "../../../../../application/constant/api.constant";

export default async function PostMotherMeterElectricityDataSource({ motherMeterElectricityModel }: PostMotherMeterElectricityDataSourceParams) {

    try {

        return await HttpCliestUtil({
            method: "POST",
            url: ApiConstant.MOTHER_METER_ELECTRICITY,
            body: classToPlain(motherMeterElectricityModel)
        });

    } catch (error) {

        return FailureMapperUtil(error);
    }
}