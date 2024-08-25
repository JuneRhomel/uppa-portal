import ApiConstant from "../../../../../../application/constant/api.constant";
import Failure from "../../../../../../application/failure/failure";
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util";

export default async function DeleteMotherMeterElectricityDataSource({ id }: { id: number }): Promise<Failure | void> {
    const response = await HttpCliestUtil(
        {
            method: "DELETE",
            url: `${ApiConstant.MOTHER_METER_ELECTRICITY}/${id}`,
        }
    )
    if (response instanceof Failure) {
        return response;
    }
    return response;
}