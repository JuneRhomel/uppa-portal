import { validate } from "class-validator";
import Failure from "../../../../application/failure/failure";
import ValidationFailure from "../../../../application/failure/validation.failure";
import FailureMapperUtil from "../../../../util/failure_mapper/failure_mapper.util";
import PostTenantRepository from "../../data/repository/post_tenant.repository";
import PostTenantRepositoryParams from "./interface/post_tenant_use_case.params";

export default async function PostTenantUseCase({ tenantEntity }: PostTenantRepositoryParams): Promise<string | Failure> {
    try {
        const validateErrors = await validate(tenantEntity);
        console.log(validateErrors);
        if (validateErrors.length > 0) {
            return new ValidationFailure(validateErrors);
        }

        return await PostTenantRepository({ tenantEntity });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}