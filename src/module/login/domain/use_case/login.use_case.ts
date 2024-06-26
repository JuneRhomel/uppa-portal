import { validate } from "class-validator";
import LoginUseCaseParams from "./interface/login_use_case.params";
import LoginFailure from "../failure/login.failure";
import LoginRepository from "../../data/repository/login.repository";

export default async function LoginUseCase({ loginEntity }: LoginUseCaseParams) {
    const validationErrors = await validate(loginEntity);

    if (validationErrors.length > 0) {
        return new LoginFailure();
    }

    return LoginRepository({ loginEntity });

}