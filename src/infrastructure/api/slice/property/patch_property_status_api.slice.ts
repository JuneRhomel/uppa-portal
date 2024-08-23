import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import ValidationFailure from "../../../../application/failure/validation.failure";
import PatchPropertyStatusUseCase from "../../module/property/domain/use_case/patch_property_status.use_case";
import AlreadyExistFailure from "../../../../application/failure/already_exist.failure";
import EditPropertyStatusUseCaseParams from "../../module/property/domain/use_case/interface/patch_property_status_use_case.params";


interface apiStates {
    isLoading: boolean,
    isValidationFailure: boolean,
    isUnhandledFailure: boolean,
    isAlreadyExist: boolean,
}



const initialState: apiStates = {
    isLoading: false,
    isValidationFailure: false,
    isUnhandledFailure: false,
    isAlreadyExist: false,
}



export const patchPropertyStatus = createAsyncThunk<
    boolean,
    EditPropertyStatusUseCaseParams,
    {
        rejectValue: string;
    }
>(
    "properties/patchPropertyStatus",
    async (params: EditPropertyStatusUseCaseParams, { rejectWithValue }) => {
        try {
            const response = await PatchPropertyStatusUseCase(params);

            if (response instanceof ValidationFailure) {
                return rejectWithValue("ValidationFailure")
            }

            if (response instanceof UnhandledFailure) {
                return rejectWithValue("UnhandledFailure")
            }

            if (response instanceof AlreadyExistFailure) {
                return rejectWithValue("AlreadyExistFailure")
            }

            return true

        } catch (error) {
            return rejectWithValue("An unexpected error occurred")
        }
    }
)


const patchPropertyStatusSlice = createSlice({
    name: "patchPropertyStatus",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(patchPropertyStatus.pending, (state, action) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(patchPropertyStatus.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false,
                }
            })
            .addCase(patchPropertyStatus.rejected, (_, action) => {
                if (action.payload === "ValidationFailure") {
                    return {
                        ...initialState,
                        isValidationFailure: true,
                    }
                }
                if (action.payload === "AlreadyExistFailure") {
                    return {
                        ...initialState,
                        isAlreadyExist: true,
                    }
                }

                if (action.payload === "UnhandledFailure") {
                    return {
                        ...initialState,
                        isUnhandledFailure: true,
                    }
                }

                return {
                    ...initialState,
                    isUnhandledError: action.payload !== undefined,
                }
            })
    }
})

const patchPropertyStatusSliceApiReducer = patchPropertyStatusSlice.reducer
export default patchPropertyStatusSliceApiReducer