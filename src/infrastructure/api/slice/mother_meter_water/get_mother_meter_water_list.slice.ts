import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceToPlain } from "class-transformer";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import GetMotherMeterWaterListUseCase from "../../module/mother_meter_water/domain/use_case/get_mother_meter_water_list.use_case";
import GetMotherMeterWaterListUseCaseParams from "../../module/mother_meter_water/domain/use_case/interface/get_mother_meter_water_list_use_case.params";
import MotherMeterWaterListEntity from "../../module/mother_meter_water/domain/entity/mother_meter_water_list.entity";


interface apiStates {
    isLoading: boolean
    isUnhandledFailure: boolean
}

const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false
}


export const getMotherMeterWaterList = createAsyncThunk<
    MotherMeterWaterListEntity,
    GetMotherMeterWaterListUseCaseParams,
    {
        rejectValue: string
    }
>(
    "motherMeterWater/getMotherMeterWaterList",
    async (params: GetMotherMeterWaterListUseCaseParams, { rejectWithValue }) => {
        const response = await GetMotherMeterWaterListUseCase(params);

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        return instanceToPlain(response) as MotherMeterWaterListEntity
    }
)

const getMotherMeterWaterListSlice = createSlice({
    name: "getMotherMeterWaterList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMotherMeterWaterList.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(getMotherMeterWaterList.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(getMotherMeterWaterList.rejected, (state, action) => {
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

const getMotherMeterWaterListApiSliceReducer = getMotherMeterWaterListSlice.reducer

export default getMotherMeterWaterListApiSliceReducer