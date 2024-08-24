import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PostMotherMeterWaterUseCaseParams from "../../module/mother_meter_water/domain/use_case/interface/post_mother_meter_water_use_case.params";
import AlreadyExistFailure from "../../../../application/failure/already_exist.failure";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import ValidationFailure from "../../../../application/failure/validation.failure";
import PostMotherMeterWaterUseCase from "../../module/mother_meter_water/domain/use_case/post_mother_meter_water.use_case";

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


export const postMotherMeterWater = createAsyncThunk<
    boolean,
    PostMotherMeterWaterUseCaseParams,
    {
        rejectValue: string;
    }
>(
    "moterMeterWater/postMeterWater",
    async (params: PostMotherMeterWaterUseCaseParams, { rejectWithValue }) => {
        const response = await PostMotherMeterWaterUseCase(params);

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

const postMotherMeterWaterSlice = createSlice({
    name: "postMotherMeterWater",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postMotherMeterWater.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(postMotherMeterWater.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(postMotherMeterWater.rejected, (state, action) => {
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

const postMotherMeterWaterApiSliceReducer = postMotherMeterWaterSlice.reducer

export default postMotherMeterWaterApiSliceReducer