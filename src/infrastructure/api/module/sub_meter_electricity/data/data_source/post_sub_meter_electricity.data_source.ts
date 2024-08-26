import { instanceToPlain } from "class-transformer";
import ApiConstant from "../../../../../../application/constant/api.constant";
import Failure from "../../../../../../application/failure/failure";
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util";
import SubMeterElectricityModel from "../model/sub_meter_electricity.model";

export default async function PostSubMeterElectricityDataSource({ subMeterElectricityModel }: { subMeterElectricityModel: SubMeterElectricityModel }): Promise<Failure | void> {
    const response = await HttpCliestUtil({
        method: "POST",
        url: ApiConstant.SUB_METER_ELECTRICITY,
        body: instanceToPlain(subMeterElectricityModel),
    });

    if (response instanceof Failure) {
        return response;
    }

    return response
}
