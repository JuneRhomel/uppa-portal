import LoginDataSource from "../data_source/login.data_source";
import LoginFailureMapper from "../mapper/login_failure/login_failure.mapper";
import LoginModel from "../model/login.model";
import LoginRepositoryParams from "./interface/login_repository.params";

export default async function LoginRepository({ loginEntity }: LoginRepositoryParams) {
    try {
        const { email, password, accountCode } = loginEntity

        const loginModel = new LoginModel(accountCode, email, password);
        const response = await LoginDataSource({ loginModel });
        return response;
    } catch (error) {
        return LoginFailureMapper(error);
    }
}