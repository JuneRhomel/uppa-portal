import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AlreadyExistFailure from "../../../../application/failure/already_exist.failure";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import ValidationFailure from "../../../../application/failure/validation.failure";
import SubMeterElectricityEntity from "../../module/sub_meter_electricity/domain/entity/sub_meter_electricity.entity";
import PostSubMeterElectricityUseCase from "../../module/sub_meter_electricity/domain/use_case/post_sub_meter_electricity.use_case";

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


export const postSubMeterElectricity = createAsyncThunk<
    boolean,
    SubMeterElectricityEntity,
    {
        rejectValue: string;
    }
>(
    "subMeterElectricity/postSubMeterElectricity",
    async (subMeterElectricityEntity: SubMeterElectricityEntity, { rejectWithValue }) => {
        const response = await PostSubMeterElectricityUseCase({ subMeterElectricityEntity });

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


const postSubMeterElectricitySlice = createSlice({
    name: "postSubMeterElectricity",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postSubMeterElectricity.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(postSubMeterElectricity.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(postSubMeterElectricity.rejected, (state, action) => {
                if (action.payload === "UnhandledFailure") {
                    return {
                        ...initialState,
                        isLoading: false,
                        isUnhandledFailure: true
                    }
                }

                if (action.payload === "AlreadyExistsFailure") {
                    return {
                        ...initialState,
                        isLoading: false,
                        isAlreadyExists: true
                    }
                }

                if (action.payload === "ValidationFailure") {
                    return {
                        ...initialState,
                        isLoading: false,
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
const postSubMeterElectricityApiSliceReducer = postSubMeterElectricitySlice.reducer

export default postSubMeterElectricityApiSliceReducer