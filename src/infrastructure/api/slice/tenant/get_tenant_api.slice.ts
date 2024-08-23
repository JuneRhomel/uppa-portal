import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instanceToPlain } from "class-transformer";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import TenantEntity from "../../module/tenant/domain/entity/tenant.entity";
import GetTenantUseCase from "../../module/tenant/domain/use_case/get_tenant.use_case";
import GetTenantUseCaseParams from "../../module/tenant/domain/use_case/interface/get_tenant_use_case.params";

interface apiStates {
    isLoading: boolean,
    isUnhandledFailure: boolean,
}


const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false,
}


export const getTenant = createAsyncThunk<
    TenantEntity,
    GetTenantUseCaseParams,
    {
        rejectValue: string;
    }
>(
    "tenant/getTenant",
    async (params: GetTenantUseCaseParams, { rejectWithValue }) => {
        const response = await GetTenantUseCase(params);

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        return instanceToPlain(response) as TenantEntity

    }
)


const getTenantSlice = createSlice({
    name: "getTenant",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTenant.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(getTenant.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false,
                    tenant: action.payload
                }
            })
            .addCase(getTenant.rejected, (state, action) => {

                if (action.payload === "UnhandledFailure") {
                    return {
                        ...initialState,
                        isError: true,
                    }
                }

                return {
                    ...initialState,
                    isUnhandledError: action.payload !== undefined,
                };
            })
    }
})

const getTenantApiSliceReducer = getTenantSlice.reducer
export default getTenantApiSliceReducer