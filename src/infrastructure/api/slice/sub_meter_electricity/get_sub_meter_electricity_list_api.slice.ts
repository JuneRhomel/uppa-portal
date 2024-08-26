import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceToPlain } from "class-transformer";
import PaginationEntity from "../../../../application/entity/pagination.entity";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import SubMeterElectricityListModel from "../../module/sub_meter_electricity/data/model/sub_meter_electricity_list.model";
import GetSubMeterElectricityListUseCase from "../../module/sub_meter_electricity/domain/use_case/get_sub_meter_electricity_list.use_case";

interface apiStates {
    isLoading: boolean
    isUnhandledFailure: boolean
}

const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false
}


export const getSubMeterElectricityList = createAsyncThunk<
    SubMeterElectricityListModel,
    PaginationEntity,
    {
        rejectValue: string
    }
>(
    "subMeterElectricity/getSubMeterElectricityList",
    async (paginationEntity: PaginationEntity, { rejectWithValue }) => {
        const response = await GetSubMeterElectricityListUseCase({ paginationEntity });

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        return instanceToPlain(response) as SubMeterElectricityListModel
    }
)

const getSubMeterElectricityListSlice = createSlice({
    name: "getSubMeterElectricityList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSubMeterElectricityList.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(getSubMeterElectricityList.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(getSubMeterElectricityList.rejected, (state, action) => {
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

const getSubMeterElectricityListApiSliceReducer = getSubMeterElectricityListSlice.reducer

export default getSubMeterElectricityListApiSliceReducer