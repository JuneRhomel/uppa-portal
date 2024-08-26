import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AlreadyExistFailure from "../../../../application/failure/already_exist.failure";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import ValidationFailure from "../../../../application/failure/validation.failure";
import SubMeterElectricityEntity from "../../module/sub_meter_electricity/domain/entity/sub_meter_electricity.entity";
import PatchSubMeterElectricityUseCase from "../../module/sub_meter_electricity/domain/use_case/patch_sub_meter_electricity.use_case";


interface apiStates {
    isLoading: boolean,
    isUnhandledFailure: boolean,
    isAlreadyExists: boolean
    validationFailure: boolean
}

const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false,
    isAlreadyExists: false,
    validationFailure: false
}


export const patchSubMeterElectricity = createAsyncThunk<
    boolean,
    SubMeterElectricityEntity,
    {
        rejectValue: string;
    }
>(
    "subMeterElectricity/patchSubMeterElectricity",
    async (subMeterElectricityEntity: SubMeterElectricityEntity, { rejectWithValue }) => {
        const response = await PatchSubMeterElectricityUseCase({ subMeterElectricityEntity });

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        if (response instanceof AlreadyExistFailure) {
            return rejectWithValue("AlreadyExistsFailure")
        }

        if (response instanceof ValidationFailure) {
            return rejectWithValue("ValidationFailure")
        }

        return true
    }
)

const patchSubMeterElectricitySlice = createSlice({
    name: "patchSubMeterElectricity",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(patchSubMeterElectricity.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(patchSubMeterElectricity.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(patchSubMeterElectricity.rejected, (state, action) => {
                if (action.payload === "UnhandledFailure") {
                    return {
                        ...initialState,
                        isUnhandledFailure: true
                    }
                }

                if (action.payload === "AlreadyExistsFailure") {
                    return {
                        ...initialState,
                        isAlreadyExists: true
                    }
                }

                if (action.payload === "ValidationFailure") {
                    return {
                        ...initialState,
                        validationFailure: true
                    }
                }

                return {
                    ...initialState,
                    isLoading: false
                }
            })
    }
})
const patchSubMeterElectricityApiSliceReducer = patchSubMeterElectricitySlice.reducer

export default patchSubMeterElectricityApiSliceReducer