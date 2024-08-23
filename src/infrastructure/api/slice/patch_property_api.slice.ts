import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UnhandledFailure from "../../../application/failure/unhandled.failure";
import PropertiesEntity from "../module/property/domain/entity/properties.entity";
import PatchPropertyUseCaseParams from "../module/property/domain/use_case/interface/patch_property.use_case";
import PatchPropertyUseCase from "../module/property/domain/use_case/patch_property.use_case";



interface apiStates {
    isLoading: boolean,
    isUnhandledFailure: boolean,
}


const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false,
}

export const patchProperty = createAsyncThunk<
    boolean,
    PatchPropertyUseCaseParams,
    {
        rejectValue: string;
    }
>(
    "properties/patchProperty",
    async (params: PatchPropertyUseCaseParams, { rejectWithValue }) => {
        try {
            const response = await PatchPropertyUseCase(params);

            if (response instanceof UnhandledFailure) {
                return rejectWithValue("UnhandledFailure");
            }

            return true;
        } catch (error) {
            return rejectWithValue("An unexpected error occurred");
        }
    }
)

const patchPropertySlice = createSlice({
    name: "patchProperty",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(patchProperty.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(patchProperty.fulfilled, (state) => {
                return {
                    ...initialState,
                    isLoading: false,
                }
            })
            .addCase(patchProperty.rejected, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false,
                    isUnhandledFailure: true,
                }
            })
    }
})
const patchPropertyApiReducer = patchPropertySlice.reducer
export default patchPropertyApiReducer