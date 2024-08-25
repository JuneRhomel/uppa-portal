import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AlreadyExistFailure from "../../../../application/failure/already_exist.failure";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import ValidationFailure from "../../../../application/failure/validation.failure";
import MotherMeterElectricityEntity from "../../module/mother_meter_electricity/domain/entity/mother_meter_electricity.entity";
import PatchMotherMeterElectricityUseCase from "../../module/mother_meter_electricity/domain/use_case/patch_mother_meter_electricity.use_case";


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


export const patchMotherMeterElectricity = createAsyncThunk<
    boolean,
    MotherMeterElectricityEntity,
    {
        rejectValue: string;
    }
>(
    "motherMeterElectricity/patchMotherMeterElectricity",
    async (motherMeterElectricityEntity: MotherMeterElectricityEntity, { rejectWithValue }) => {
        const response = await PatchMotherMeterElectricityUseCase({ motherMeterElectricityEntity });

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


const patchMotherMeterElectricitySlice = createSlice({
    name: "patchMotherMeterElectricity",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(patchMotherMeterElectricity.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(patchMotherMeterElectricity.fulfilled, (state, action) => {

                return {
                    ...initialState,
                    isLoading: false
                }
            })

            .addCase(patchMotherMeterElectricity.rejected, (_, action) => {

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

const patchMotherMeterElectricityApiSliceReducer = patchMotherMeterElectricitySlice.reducer

export default patchMotherMeterElectricityApiSliceReducer