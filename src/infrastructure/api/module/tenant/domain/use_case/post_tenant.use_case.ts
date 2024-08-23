import { validate } from "class-validator";
import PostTenantRepository from "../../data/repository/post_tenant.repository";
import PostTenantUseCaseParams from "./interface/post_tenant_use_case.params";
import Failure from "../../../../../../application/failure/failure";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import ValidationFailure from "../../../property/domain/failure/validation";

export default async function PostTenantUseCase({ tenantEntity }: PostTenantUseCaseParams): Promise<string | Failure> {
    try {
        const validateErrors = await validate(tenantEntity);
        console.log(validateErrors);
        if (validateErrors.length > 0) {
            return new ValidationFailure({ extra: validateErrors });
        }

        return await PostTenantRepository({ tenantEntity });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}