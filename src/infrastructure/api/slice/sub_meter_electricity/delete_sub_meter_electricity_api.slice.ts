import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import DeleteSubMeterElectricityUseCase from "../../module/sub_meter_electricity/domain/use_case/delete_sub_meter_electricity.use_case";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";

interface apiStates {
    isLoading: boolean,
    isUnhandledFailure: boolean,
}

const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false,
}


export const deleteSubMeterElectricity = createAsyncThunk<
    boolean,
    number,
    {
        rejectValue: string;
    }
>(
    "subMeterElectricity/deleteSubMeterElectricity",
    async (id: number, { rejectWithValue }) => {
        const response = await DeleteSubMeterElectricityUseCase({ id });

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        return true
    }
)

const deleteSubMeterElectricitySlice = createSlice({
    name: "deleteSubMeterElectricity",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteSubMeterElectricity.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(deleteSubMeterElectricity.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(deleteSubMeterElectricity.rejected, (state, action) => {
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

const  deleteSubMeterElectricityApiSliceReducer = deleteSubMeterElectricitySlice.reducer

export default deleteSubMeterElectricityApiSliceReducer