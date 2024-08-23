
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GetPropertyTypeUseCase from "../module/property/domain/use_case/get_property_type.use_case";
import UnhandledFailure from "../../../application/failure/unhandled.failure";
import PropertyTypeEntity from "../module/property/domain/entity/property_type.entity";



interface apiStates {
    isLoading: boolean,
    isUnhandledFailure: boolean,
}

const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false,
}


export const getPropertyTypes = createAsyncThunk<
    PropertyTypeEntity[],
    void,
    {
        rejectValue: string;
    }
>(
    "properties/getPropertyTypes",
    async (_, { rejectWithValue }) => {
        try {
            const response = await GetPropertyTypeUseCase();

            if (response instanceof UnhandledFailure) {
                return rejectWithValue("UnhandledFailure")
            }
            return response as PropertyTypeEntity[]

        } catch (error) {
            return rejectWithValue("An unexpected error occurred")
        }
    }
)


const getPropertyTypesSlice = createSlice({
    name: "getPropertyTypes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPropertyTypes.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(getPropertyTypes.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false,
                }
            })
            .addCase(getPropertyTypes.rejected, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false,
                    isUnhandledFailure: true,
                }
            })
    }
})
const getProeprtyTypesApiReducer = getPropertyTypesSlice.reducer
export default getProeprtyTypesApiReducer