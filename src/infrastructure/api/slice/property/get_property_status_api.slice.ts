import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PropertyStatusEntity from "../../module/property/domain/entity/property_status.entity";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import GetPropertyStatusUseCase from "../../module/property/domain/use_case/get_property_status.use_case";


interface apiStates {
    isLoading: boolean,
    isUnhandledFailure: boolean,
}

const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false,
}


export const getPropertyStatus = createAsyncThunk<
    PropertyStatusEntity[],
    void,
    {
        rejectValue: string;
    }
>(
    "properties/getPropertyStatus",
    async (_, { rejectWithValue }) => {
        try {
            const response = await GetPropertyStatusUseCase();

            if (response instanceof UnhandledFailure) {
                return rejectWithValue("UnhandledFailure")
            }
            return response as PropertyStatusEntity[]

        } catch (error) {
            return rejectWithValue("An unexpected error occurred")
        }
    }
)

const getPropertyStatusSlice = createSlice({
    name: "getPropertyStatus",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPropertyStatus.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(getPropertyStatus.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false,
                }
            })
            .addCase(getPropertyStatus.rejected, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false,
                    isUnhandledFailure: true,
                }
            })
    }
})
const getPropertyStatusApiReducer = getPropertyStatusSlice.reducer
export default getPropertyStatusApiReducer