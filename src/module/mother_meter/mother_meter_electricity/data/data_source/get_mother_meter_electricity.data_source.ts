import { plainToInstance } from "class-transformer";
import ApiConstant from "../../../../../application/constant/api.constant";
import Failure from "../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../util/failure_mapper/failure_mapper.util";
import HttpCliestUtil from "../../../../../util/http_client/http_cliest.util";
import MotherMeterElectricityListModel from "../model/mother_meter_electricity_list.model";
import GetMotherMeterElectricityDataSourceParams from "./interface/get_mother_meter_electricity_data_source.params";

export default async function GetMotherMeterElectricityDataSource({ paginationModel }: GetMotherMeterElectricityDataSourceParams)
    : Promise<MotherMeterElectricityListModel | Failure> {
    try {
        const { search, page, numberOfRows, columns, sortBy, sortOrder, filters } =
            paginationModel;

        const response = await HttpCliestUtil({
            method: "GET",
            url: `${ApiConstant.MOTHER_METER_ELECTRICITY}?search=${search}&page=${page}&numberOfRows=${numberOfRows}&columns=${columns}&sortBy=${sortBy}&sortOrder=${sortOrder}&filters=${filters}`,
        })

        if (response instanceof Failure) {
            return response;
        }

        return response


    } catch (error) {

        return FailureMapperUtil(error);
    }
}