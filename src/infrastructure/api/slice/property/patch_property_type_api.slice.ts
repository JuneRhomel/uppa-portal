import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AlreadyExistFailure from "../../../../application/failure/already_exist.failure";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import PatchPropertyTypeUseCaseParams from "../../module/property/domain/use_case/interface/patch_property_type_use_case.params";
import PatchPropertyTypeUseCase from "../../module/property/domain/use_case/patch_property_type.use_case";


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

export const patchPropertyType = createAsyncThunk<
    boolean,
    PatchPropertyTypeUseCaseParams,
    {
        rejectValue: string;
    }
>(
    "properties/patchPropertyType",
    async (params: PatchPropertyTypeUseCaseParams, { rejectWithValue }) => {
        try {
            const response = await PatchPropertyTypeUseCase(params);

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




const patchPropertyTypeSlice = createSlice({
    name: "patchPropertyType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(patchPropertyType.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(patchPropertyType.fulfilled, (state) => {
                return {
                    ...initialState,
                    isLoading: false,
                }
            })
            .addCase(patchPropertyType.rejected, (state, action) => {

                if (action.payload === "UnhandledFailure") {
                    return {
                        ...initialState,
                        isUnhandledFailure: true,
                    }
                }

                if (action.payload === "AlreadyExistFailure") {
                    return {
                        ...initialState,
                        isAlreadyExist: true,
                    }
                }

                return {
                    ...initialState,
                    isLoading: false,
                }
            })
    }
})

const patchPropertyTypeSliceApiReducer = patchPropertyTypeSlice.reducer
export default patchPropertyTypeSliceApiReducer