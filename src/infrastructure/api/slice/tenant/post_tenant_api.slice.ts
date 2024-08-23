import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AlreadyExistFailure from "../../../../application/failure/already_exist.failure";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import ValidationFailure from "../../../../application/failure/validation.failure";
import PostTenantUseCase from "../../module/tenant/domain/use_case/post_tenant.use_case";
import PostTenantUseCaseParams from "../../module/tenant/domain/use_case/interface/post_tenant_use_case.params";

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


export const postTenant = createAsyncThunk<
    boolean,
    PostTenantUseCaseParams,
    {
        rejectValue: string;
    }
>(
    "tenant/postTenant",
    async (params: PostTenantUseCaseParams, { rejectWithValue }) => {
        const response = await PostTenantUseCase(params);

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        if (response instanceof AlreadyExistFailure) {
            return rejectWithValue("AlreadyExistsFailure")
        }

        if (response instanceof ValidationFailure) {
            return rejectWithValue("ValidationFailure")
        }

        return true
    }
)


const postTenantSlice = createSlice({
    name: "postTenant",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postTenant.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(postTenant.fulfilled, (state) => {

                return {
                    ...initialState,
                    isLoading: false,
                }
            })
            .addCase(postTenant.rejected, (state, action) => {

                if (action.payload === "UnhandledFailure") {
                    return {
                        ...initialState,
                        isUnhandledFailure: true,
                    }
                }

                if (action.payload === "AlreadyExistsFailure") {
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