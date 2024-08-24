import { validate } from "class-validator";
import FailureMapperUtil from "../../../../../../util/failure_mapper/failure_mapper.util";
import PatchTenantRepository from "../../data/repository/patch_tenant.repository";
import PatchTenantUseCaseParams from "./interface/patch_tenant_use_case.params";
import ValidationFailure from "../../../../../../application/failure/validation.failure";


export default async function PatchTenantUseCase({ tenantEntity }: PatchTenantUseCaseParams) {
    try {
        const validateErrors = await validate(tenantEntity);

        if (validateErrors.length > 0) {
            return new ValidationFailure(validateErrors);
        }

        return await PatchTenantRepository({ tenantEntity });
    } catch (error) {
        return FailureMapperUtil(error);
    }
}