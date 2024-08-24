
import ApiConstant from "../../../../../../application/constant/api.constant";
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util";
import MotherMeterWaterListModel from "../model/mother_meter_water_list.model";
import GetMotherMeterWaterDataSourceParams from "./interface/get_mother_meter_water_list_data_source.params";

export default async function GetMotherMeterWaterListDataSource({ paginationModel }: GetMotherMeterWaterDataSourceParams): Promise<MotherMeterWaterListModel | Failure> {
    try {
        const { search, page, numberOfRows, columns, sortBy, sortOrder, filters } =
            paginationModel;

        return  HttpCliestUtil({
            method: "GET",
            url: `${ApiConstant.MOTHER_METER_WATER}?search=${search}&page=${page}&numberOfRows=${numberOfRows}&columns=${columns}&sortBy=${sortBy}&sortOrder=${sortOrder}&filters=${filters}`,
        })



    } catch (error) {
        return FailureMapperUtil(error);
    }
}