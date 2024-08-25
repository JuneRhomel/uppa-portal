import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instanceToPlain } from "class-transformer";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import MotherMeterElectricityEntity from "../../module/mother_meter_electricity/domain/entity/mother_meter_electricity.entity";
import GetMotherMeterElectricityUseCase from "../../module/mother_meter_electricity/domain/use_case/get_mother_meter_electricity.use_case";

interface apiStates {
    isLoading: boolean,
    isUnhandledFailure: boolean,
}

const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false,
}


export const getMotherMeterElectricity = createAsyncThunk<
    MotherMeterElectricityEntity,
    number,
    {
        rejectValue: string;
    }
>(
    "motherMeterElectricity/getMotherMeterElectricity",
    async (id: number, { rejectWithValue }) => {
        const response = await GetMotherMeterElectricityUseCase({ id });

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        const motherMeterElectricity = instanceToPlain(response)

        return motherMeterElectricity as MotherMeterElectricityEntity

    }
)

const getMotherMeterElectricitySlice = createSlice({
    name: "getMotherMeterElectricity",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMotherMeterElectricity.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(getMotherMeterElectricity.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false,
                }
            })
            .addCase(getMotherMeterElectricity.rejected, (_, action) => {
                if (action.payload === "UnhandledFailure") {
                    return {
                        ...initialState,
                        isLoading: false,
                    }
                }
                return {
                    ...initialState,
                    isLoading: false,
                    isUnhandledFailure: true,
                }
            })
    }
})

const getMotherMeterElectricityApiSliceReducer = getMotherMeterElectricitySlice.reducer;

export default getMotherMeterElectricityApiSliceReducer