import Failure from "../../../../application/failure/failure";
import AuthCredentialsEntity from "../../domain/entity/auth_credential.entity";
import LoginDataSource from "../data_source/login.data_source";
import LoginFailureMapper from "../mapper/login_failure/login_failure.mapper";
import LoginModel from "../model/login.model";
import LoginRepositoryParams from "./interface/login_repository.params";

export default async function LoginRepository({ loginEntity }: LoginRepositoryParams): Promise<AuthCredentialsEntity | Failure> {
    try {
        const { email, password, accountCode } = loginEntity

        const loginModel = new LoginModel(accountCode, email, password);
        const response = await LoginDataSource({ loginModel });

        if (response instanceof Failure) {
            throw response;
        }


        return new AuthCredentialsEntity(
            response.accountCode,
            response.email,
            response.accountCode,
            response.token
        );
    } catch (error) {
        return LoginFailureMapper(error);
    }
}