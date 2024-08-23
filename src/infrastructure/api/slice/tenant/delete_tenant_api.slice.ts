import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import DeleteTenantUseCase from "../../module/tenant/domain/use_case/delete_tenant.use_case";
import DeleteTenantUseCaseParams from "../../module/tenant/domain/use_case/interface/delete_tenant_use_case.params";

interface apiStates {
    isLoading: boolean,
    isUnhandledFailure: boolean
}


const initialState = {
    isLoading: false,
    isUnhandledFailure: false
}

export const deleteTenant = createAsyncThunk<
    boolean,
    DeleteTenantUseCaseParams,
    {
        rejectValue: string;
    }
>(
    "tenant/deleteTenant",
    async (params: DeleteTenantUseCaseParams, { rejectWithValue }) => {
        const response = await DeleteTenantUseCase(params);

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        return true

    }

)


const deleteTenantSlice = createSlice({
    name: "deleteTenant",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteTenant.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(deleteTenant.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(deleteTenant.rejected, (state, action) => {
                if (action.payload === "UnhandledFailure") {
                    return {
                        ...initialState,
                        isUnhandledFailure: true,
                    }
                }
            })
    }
})

const deleteTenantApiSliceReducer = deleteTenantSlice.reducer

export default deleteTenantApiSliceReducer