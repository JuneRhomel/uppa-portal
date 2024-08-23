import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instanceToPlain } from "class-transformer";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import ValidationFailure from "../../../../application/failure/validation.failure";
import TenantEntity from "../../module/tenant/domain/entity/tenant.entity";
import PatchTenantUseCase from "../../module/tenant/domain/use_case/patch_tenant.use_case";
import AlreadyExistFailure from "../../../../application/failure/already_exist.failure";
import PatchTenantUseCaseParams from "../../module/tenant/domain/use_case/interface/patch_tenant_use_case.params";


interface apiStates {
    isLoading: boolean,
    isUnhandledFailure: boolean,
    isAlreadyExists: boolean
    ValidationFailure: boolean
}


const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false,
    isAlreadyExists: false,
    ValidationFailure: false
}


export const patchTenant = createAsyncThunk<
    TenantEntity,
    PatchTenantUseCaseParams,
    {
        rejectValue: string;
    }
>(
    "tenant/patchTenant",
    async (params: PatchTenantUseCaseParams, { rejectWithValue }) => {
        const response = await PatchTenantUseCase(params);

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        if (response instanceof AlreadyExistFailure) {
            return rejectWithValue("AlreadyExists")
        }

        if (response instanceof ValidationFailure) {
            return rejectWithValue("ValidationFailure")
        }

        return instanceToPlain(response) as TenantEntity

    }
)


const patchTenantSlice = createSlice({
    name: "patchTenant",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(patchTenant.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(patchTenant.fulfilled, (state) => {
                return {
                    ...initialState,
                    isLoading: false,
                }
            })
            .addCase(patchTenant.rejected, (state, action) => {

                if (action.payload === "UnhandledFailure") {
                    return {
                        ...initialState,
                        isUnhandledFailure: true,
                    }
                }

                if (action.payload === "AlreadyExists") {
                    return {
                        ...initialState,
                        isAlreadyExists: true,
                    }
                }

                if (action.payload === "ValidationFailure") {
                    return {
                        ...initialState,
                        ValidationFailure: true,
                    }
                }
                return {
                    ...initialState,
                    isLoading: false,
                }
            })
    }
})

const patchTenantApiSliceReducer = patchTenantSlice.reducer
export default patchTenantApiSliceReducer