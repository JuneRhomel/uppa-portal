import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import DeleteSubMeterWaterUseCase from "../../module/sub_meter_water/domain/use_case/delete_sub_meter_wate.use_case";

interface apiStates {
    isLoading: boolean,
    isUnhandledFailure: boolean,
}

const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false,
}


export const deleteSubMeterWater = createAsyncThunk<
    boolean,
    number,
    {
        rejectValue: string;
    }
>(
    "subMeterWater/deleteSubMeterWater",
    async (id: number, { rejectWithValue }) => {
        const response = await DeleteSubMeterWaterUseCase({ id });

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        return true
    }
)

const deleteSubMeterWaterSlice = createSlice({
    name: "deleteSubMeterWater",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteSubMeterWater.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(deleteSubMeterWater.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(deleteSubMeterWater.rejected, (state, action) => {
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

const deleteSubMeterWaterApiSliceReducer = deleteSubMeterWaterSlice.reducer

export default deleteSubMeterWaterApiSliceReducer