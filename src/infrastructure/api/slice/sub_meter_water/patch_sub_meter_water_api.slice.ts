import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AlreadyExistFailure from "../../../../application/failure/already_exist.failure";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import ValidationFailure from "../../../../application/failure/validation.failure";
import SubMeterWaterEntity from "../../module/sub_meter_water/domain/entity/sub_meter_water.entity";
import PatchSubMeterWaterUseCase from "../../module/sub_meter_water/domain/use_case/patch_sub_meter_water.use_case";


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


export const patchSubMeterWater = createAsyncThunk<
    boolean,
    SubMeterWaterEntity,
    {
        rejectValue: string;
    }
>(
    "subMeterWater/patchSubMeterWater",
    async (subMeterWaterEntity: SubMeterWaterEntity, { rejectWithValue }) => {
        const response = await PatchSubMeterWaterUseCase({ subMeterWaterEntity });

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


const patchSubMeterWaterSlice = createSlice({
    name: "patchSubMeterWater",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(patchSubMeterWater.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(patchSubMeterWater.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(patchSubMeterWater.rejected, (state, action) => {
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

const patchSubMeterWaterApiSliceReducer = patchSubMeterWaterSlice.reducer

export default patchSubMeterWaterApiSliceReducer