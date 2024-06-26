import { instanceToPlain, plainToInstance } from "class-transformer";
import ApiConstant from "../../../../application/constant/api.constant";
import HttpCliestUtil from "../../../../util/http_client/http_cliest.util";
import LoginDataSourceParams from "./interface/login_data_source.params";
import AuthCredentialsModel from "../model/auth_credentials.model";

export default async function LoginDataSource({ loginModel }: LoginDataSourceParams) {
    const response = HttpCliestUtil(
        {
            method: "POST",
            url: ApiConstant.LOGIN,
            body: instanceToPlain(loginModel),
        }
    )
    const ss = plainToInstance(AuthCredentialsModel, response as object, {
        excludeExtraneousValues: true,
    });

    return ss;
}