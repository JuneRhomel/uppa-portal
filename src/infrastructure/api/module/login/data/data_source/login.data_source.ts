import { instanceToPlain, plainToInstance } from "class-transformer";
import ApiConstant from "../../../../../../application/constant/api.constant";
import Failure from "../../../../../../application/failure/failure";
import HttpCliestUtil from "../../../../../../util/http_client/http_cliest.util";
import AuthCredentialsModel from "../model/auth_credentials.model";
import LoginDataSourceParams from "./interface/login_data_source.params";

export default async function LoginDataSource({ loginModel }: LoginDataSourceParams): Promise<AuthCredentialsModel | Failure> {
    const response = await HttpCliestUtil(
        {
            method: "POST",
            url: ApiConstant.LOGIN,
            body: instanceToPlain(loginModel),
        }
    )
    if (response instanceof Failure) {
        return response;
    }

    const ss = plainToInstance(AuthCredentialsModel, response as object, {
        excludeExtraneousValues: true,
    });

    return ss;
}