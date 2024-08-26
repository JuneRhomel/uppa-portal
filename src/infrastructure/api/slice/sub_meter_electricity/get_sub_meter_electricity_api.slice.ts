import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceToPlain } from "class-transformer";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import SubMeterElectricityEntity from "../../module/sub_meter_electricity/domain/entity/sub_meter_electricity.entity";
import GetSubMeterElectricityUseCase from "../../module/sub_meter_electricity/domain/use_case/get_sub_meter_electricity.use_case";

interface apiStates {
    isLoading: boolean
    isUnhandledFailure: boolean
}

const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false
}


export const getSubMeterElectricity = createAsyncThunk<
    SubMeterElectricityEntity,
    number,
    {
        rejectValue: string
    }
>(
    "subMeterElectricity/getSubMeterElectricity",
    async (id: number, { rejectWithValue }) => {
        const response = await GetSubMeterElectricityUseCase({ id });

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        return instanceToPlain(response) as SubMeterElectricityEntity
    }
)

const getSubMeterElectricitySlice = createSlice({
    name: "getSubMeterElectricity",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSubMeterElectricity.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(getSubMeterElectricity.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(getSubMeterElectricity.rejected, (state, action) => {
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
const getSubMeterElectricityApiSliceReducer = getSubMeterElectricitySlice.reducer

export default getSubMeterElectricityApiSliceReducer