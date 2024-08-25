import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import DeleteMotherMeterElectricityUseCase from "../../module/mother_meter_electricity/domain/use_case/delete_mother_meter_electricity.use_case";

interface apiStates {
    isLoading: boolean
    isUnhandledFailure: boolean
}


const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false
}


export const deleteMotherMeterElectricity = createAsyncThunk<
    boolean,
    number,
    {
        rejectValue: string
    }
>(
    "motherMeterElectricity/deleteMotherMeterElectricity",
    async (id: number, { rejectWithValue }) => {
        const response = await DeleteMotherMeterElectricityUseCase({ id });

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        return true
    }
)


const deleteMotherMeterElectricitySlice = createSlice({
    name: "deleteMotherMeterElectricity",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteMotherMeterElectricity.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(deleteMotherMeterElectricity.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(deleteMotherMeterElectricity.rejected, (state, action) => {
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

const deleteMotherMeterElectricityApiSliceReducer = deleteMotherMeterElectricitySlice.reducer

export default deleteMotherMeterElectricityApiSliceReducer