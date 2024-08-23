import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GetTenantStatusUseCase from "../../module/tenant/domain/use_case/get_tenant_status.use_case";
import { instanceToPlain } from "class-transformer";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import TenantStatusEntity from "../../module/tenant/domain/entity/tenant_status.entity";

interface apiStates {
    isLoading: boolean,
    isUnhandledFailure: boolean,
}

const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false,
}


export const getTenantStatusList = createAsyncThunk<
    TenantStatusEntity[],
    void,
    {
        rejectValue: string;
    }
>(
    "tenant/getTenantStatusList",
    async (_, { rejectWithValue }) => {
        const response = await GetTenantStatusUseCase();

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        const tenantStatusList = instanceToPlain(response)

        return tenantStatusList as TenantStatusEntity[]

    }

)



const getTenantStatusListSlice = createSlice({
    name: "getTenantStatusList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTenantStatusList.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(getTenantStatusList.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false,
                }
            })
            .addCase(getTenantStatusList.rejected, (state, action) => {

                if (action.payload === "UnhandledFailure") {
                    return {
                        ...initialState,
                        isUnhandledFailure: true,
                    }
                }

                return {
                    ...initialState,
                    isLoading: false,

                }

            })

    }

})


const getTenantListStatusApiSliceReducer = getTenantStatusListSlice.reducer
export default getTenantListStatusApiSliceReducer