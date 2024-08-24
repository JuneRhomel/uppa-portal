import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import DeleteMotherMeterWaterUseCase from "../../module/mother_meter_water/domain/use_case/delete_mother_meter_water.use_case";

interface apiStates {
    isLoading: boolean
    isUnhandledFailure: boolean
}


const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false
}


export const deleteMotherMeterWater = createAsyncThunk<
    boolean,
    number,
    {
        rejectValue: string
    }
>(
    "motherMeterWater/deleteMotherMeterWater",
    async (id: number, { rejectWithValue }) => {
        const response = await DeleteMotherMeterWaterUseCase({ id });

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        return true
    }
)


const deleteMotherMeterWaterSlice = createSlice({
    name: "deleteMotherMeterWater",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteMotherMeterWater.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(deleteMotherMeterWater.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(deleteMotherMeterWater.rejected, (state, action) => {
                if (action.payload === "UnhandledFailure") {
                    return {
                        ...initialState,
                        isUnhandledFailure: true
                    }
                }

                return {
                    ...initialState,
                    isLoading: false
                }
            })
    }
})

const deleteMotherMeterWaterApiSliceReducer = deleteMotherMeterWaterSlice.reducer

export default deleteMotherMeterWaterApiSliceReducer