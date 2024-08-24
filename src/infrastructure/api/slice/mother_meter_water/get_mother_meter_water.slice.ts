import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceToPlain } from "class-transformer";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import MotherMeterWaterEntity from "../../module/mother_meter_water/domain/entity/mother_meter_water.entity";
import GetMotherMeterWaterUseCase from "../../module/mother_meter_water/domain/use_case/get_mother_meter_water.use_case";

interface apiStates {
    isLoading: boolean
    isUnhandledFailure: boolean
}


const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false
}


export const getMotherMeterWater = createAsyncThunk<
    MotherMeterWaterEntity,
    number,
    {
        rejectValue: string
    }
>(
    "motherMeterWater/getMotherMeterWater",
    async (id: number, { rejectWithValue }) => {
        const response = await GetMotherMeterWaterUseCase({ id });

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        return instanceToPlain(response) as MotherMeterWaterEntity
    }
)

const getMotherMeterWaterSlice = createSlice({
    name: "getMotherMeterWater",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMotherMeterWater.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(getMotherMeterWater.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(getMotherMeterWater.rejected, (state, action) => {
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

const getMotherMeterWaterApiSliceReducer = getMotherMeterWaterSlice.reducer
export default getMotherMeterWaterApiSliceReducer