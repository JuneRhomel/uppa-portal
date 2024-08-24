import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AlreadyExistFailure from "../../../../application/failure/already_exist.failure";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import ValidationFailure from "../../../../application/failure/validation.failure";
import PatchMotherMeterWaterUseCase from "../../module/mother_meter_water/domain/use_case/patch_mother_meter_water.use_case";
import MotherMeterWaterEntity from "../../module/mother_meter_water/domain/entity/mother_meter_water.entity";


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


export const patchMotherMeterWater = createAsyncThunk<
    boolean,
    MotherMeterWaterEntity,
    {
        rejectValue: string;
    }
>(
    "moterMeterWater/patchMeterWater",
    async (motherMeterWaterEntity: MotherMeterWaterEntity, { rejectWithValue }) => {
        const response = await PatchMotherMeterWaterUseCase({ motherMeterWaterEntity });

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


const patchMotherMeterWaterSlice = createSlice({
    name: "patchMotherMeterWater",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(patchMotherMeterWater.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(patchMotherMeterWater.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(patchMotherMeterWater.rejected, (state, action) => {

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

const patchMotherMeterWaterApiSliceReducer = patchMotherMeterWaterSlice.reducer

export default patchMotherMeterWaterApiSliceReducer