import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceToPlain } from "class-transformer";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import SubMeterWaterEntity from "../../module/sub_meter_water/domain/entity/sub_meter_water.entity";
import GetSubMeterWaterUseCase from "../../module/sub_meter_water/domain/use_case/get_sub_meter_water.use_case";

interface apiStates {
    isLoading: boolean
    isUnhandledFailure: boolean
}


const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false
}


export const getSubMeterWater = createAsyncThunk<
    SubMeterWaterEntity,
    number,
    {
        rejectValue: string
    }
>(
    "subMeterWater/getSubMeterWater",
    async (id: number, { rejectWithValue }) => {
        const response = await GetSubMeterWaterUseCase({ id });

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        return instanceToPlain(response) as SubMeterWaterEntity
    }
)

const getSubMeterWaterSlice = createSlice({
    name: "getSubMeterWater",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSubMeterWater.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(getSubMeterWater.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(getSubMeterWater.rejected, (state, action) => {
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

const getSubMeterWaterApiSliceReducer = getSubMeterWaterSlice.reducer
export default getSubMeterWaterApiSliceReducer