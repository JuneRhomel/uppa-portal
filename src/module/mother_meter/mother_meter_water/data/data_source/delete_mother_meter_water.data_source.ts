import ApiConstant from "../../../../../application/constant/api.constant";
import Failure from "../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../util/failure_mapper/failure_mapper.util";
import HttpCliestUtil from "../../../../../util/http_client/http_cliest.util";

export default async function DeleteMotherMeterWaterDataSource({ id }: { id: number }): Promise<Failure | String> {
    try {
        const response = await HttpCliestUtil({
            method: "DELETE",
            url: `${ApiConstant.MOTHER_METER_WATER}/${id}`,
        });
        if (response instanceof Failure) {
            throw response
        }
        return "success";
    } catch (error) {
        return FailureMapperUtil(error);
    }
}