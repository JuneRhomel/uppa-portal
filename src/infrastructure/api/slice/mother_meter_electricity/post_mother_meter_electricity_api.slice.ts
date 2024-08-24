import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AlreadyExistFailure from "../../../../application/failure/already_exist.failure";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import ValidationFailure from "../../../../application/failure/validation.failure";
import PostMotherMeterElectricityUseCaseParams from "../../module/mother_meter_electricity/domain/use_case/interface/post_mother_meter_electricity_use_case.params";
import PostMotherMeterElectricityUseCase from "../../module/mother_meter_electricity/domain/use_case/post_mother_meter_electricity.use_case.params";


interface apiStates {
    isLoading: boolean,
    isValidationFailure: boolean,
    isUnhandledFailure: boolean,
    isAlreadyExist: boolean
}


const initialState: apiStates = {
    isLoading: false,
    isValidationFailure: false,
    isUnhandledFailure: false,
    isAlreadyExist: false
}

export const postMotherMeterElectricity = createAsyncThunk<
    boolean,
    PostMotherMeterElectricityUseCaseParams,
    {
        rejectValue: string;
    }
>(
    "motherMeterElectricity/postMotherMeterElectricity",
    async (params: PostMotherMeterElectricityUseCaseParams, { rejectWithValue }) => {

        const response = await PostMotherMeterElectricityUseCase(params);

        if (response instanceof ValidationFailure) {
            return rejectWithValue("ValidationFailure")
        }

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        if (response instanceof AlreadyExistFailure) {
            return rejectWithValue("AlreadyExistFailure")
        }

        return true


    }
)



const postMotherMeterElectricitySlice = createSlice({
    name: "postMotherMeterElectricity",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postMotherMeterElectricity.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(postMotherMeterElectricity.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false,
                }
            })
            .addCase(postMotherMeterElectricity.rejected, (_, action) => {
                if (action.payload === "ValidationFailure") {
                    return {
                        ...initialState,
                        isLoading: false,
                        isValidationFailure: true
                    }
                }

                if (action.payload === "UnhandledFailure") {
                    return {
                        ...initialState,
                        isLoading: false,
                        isUnhandledFailure: true
                    }
                }

                if (action.payload === "AlreadyExistFailure") {
                    return {
                        ...initialState,
                        isLoading: false,
                        isAlreadyExist: true
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

const postMotherMeterElectricityApiSliceReducer = postMotherMeterElectricitySlice.reducer

export default postMotherMeterElectricityApiSliceReducer