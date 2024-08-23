import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Failure from "../../../../application/failure/failure";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import GetTenantListUseCase from "../../module/tenant/domain/use_case/get_tenant_list.use_case";
import GetTenantListUseCaseParams from "../../module/tenant/domain/use_case/interface/get_tenant_list_use_case.params";
import { instanceToPlain } from "class-transformer";
import TenantListEntity from "../../module/tenant/domain/entity/tenant_list.entity";

interface apiStates {
    isLoading: boolean,
    isUnhandledFailure: boolean,
}


const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false,
}


export const getTenantList = createAsyncThunk<
    TenantListEntity,
    GetTenantListUseCaseParams,
    {
        rejectValue: string;
    }
>(
    "tenant/getTenantList",
    async (params: GetTenantListUseCaseParams, { rejectWithValue }) => {
        const response = await GetTenantListUseCase(params);

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        const tenantList = instanceToPlain(response)

        return tenantList as TenantListEntity

    }
)



const getTenantListSlice = createSlice({
    name: "getTenantList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTenantList.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(getTenantList.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false,
                }
            })
            .addCase(getTenantList.rejected, (state, action) => {

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


const getTenantListApiSliceReducer = getTenantListSlice.reducer
export default getTenantListApiSliceReducer