import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instanceToPlain } from "class-transformer";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import MotherMeterElectricityListEntity from "../../module/mother_meter_electricity/domain/entity/mother_meter_electricity_list.entity";
import GetMotherMeterElectricityListUseCaseParams from "../../module/mother_meter_electricity/domain/use_case/interface/get_mother_meter_electricity_list_use_case.params";
import GetMotherMeterElectricityListUseCase from "../../module/mother_meter_electricity/domain/use_case/get_mother_meter_electricity_list.use_case";

interface apiStates {
    isLoading: boolean,
    isUnhandledFailure: boolean,
}

const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false,
}

export const getMotherMeterElectricityList = createAsyncThunk<
    MotherMeterElectricityListEntity,
    GetMotherMeterElectricityListUseCaseParams,
    {
        rejectValue: string;
    }
>(
    "motherMeterElectricity/getMotherMeterElectricityList",
    async (params: GetMotherMeterElectricityListUseCaseParams, { rejectWithValue }) => {
        const response = await GetMotherMeterElectricityListUseCase(params);

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        const motherMeterElectricityList = instanceToPlain(response)

        return motherMeterElectricityList as MotherMeterElectricityListEntity

    }
)


const getMotherMeterElectricityListSlice = createSlice({
    name: "getMotherMeterElectricityList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMotherMeterElectricityList.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(getMotherMeterElectricityList.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false,
                }
            })
            .addCase(getMotherMeterElectricityList.rejected, (_, action) => {
                if (action.payload === "UnhandledFailure") {
                    return {
                        ...initialState,
                        isLoading: false,
                    }
                }
                return {
                    ...initialState,
                    isLoading: false,
                    isUnhandledFailure: true
                }
            })
    }
})

const getMotherMeterElectricityListApiSliceReducer = getMotherMeterElectricityListSlice.reducer

export default getMotherMeterElectricityListApiSliceReducer