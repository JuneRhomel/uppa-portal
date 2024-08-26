import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PaginationEntity from "../../../../application/entity/pagination.entity";
import { instanceToPlain } from "class-transformer";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import SubMeterWaterListEntity from "../../module/sub_meter_water/domain/entity/sub_meter_water_list.entity";
import GetSubMeterWaterListUseCase from "../../module/sub_meter_water/domain/use_case/get_sub_meter_water_list.use_case";


interface apiStates {
    isLoading: boolean
    isUnhandledFailure: boolean
}

const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false
}


export const getSubMeterWaterList = createAsyncThunk<
    SubMeterWaterListEntity,
    PaginationEntity,
    {
        rejectValue: string
    }
>(
    "subMeterWater/getSubMeterWaterList",
    async (paginationEntity: PaginationEntity, { rejectWithValue }) => {
        const response = await GetSubMeterWaterListUseCase({ paginationEntity });

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        return instanceToPlain(response) as SubMeterWaterListEntity
    }
)

const getSubMeterWaterListSlice = createSlice({
    name: "getSubMeterWaterList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSubMeterWaterList.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(getSubMeterWaterList.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(getSubMeterWaterList.rejected, (state, action) => {
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

const getSubMeterWaterListApiSliceReducer = getSubMeterWaterListSlice.reducer
export default getSubMeterWaterListApiSliceReducer