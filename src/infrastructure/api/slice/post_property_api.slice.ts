import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PropertiesEntity from "../module/property/domain/entity/properties.entity";
import ValidationFailure from "../../../application/failure/validation.failure";
import DuplicatedFailure from "../../../application/failure/duplicated.failure";
import PostPropertyUseCase from "../module/property/domain/use_case/post_property.use_case";
import UnhandledFailure from "../../../application/failure/unhandled.failure";

interface apiStates {
    isLoading: boolean,
    isValidationFailure: boolean,
    isUnhandledFailure: boolean,
}


const initialState: apiStates = {
    isLoading: false,
    isValidationFailure: false,
    isUnhandledFailure: false,
}


export const postProperty = createAsyncThunk<
    boolean,
    PropertiesEntity,
    {
        rejectValue: string;
    }
>(
    "properties/postProperty",
    async (propertyEntity: PropertiesEntity, { rejectWithValue }) => {
        try {
            const response = await PostPropertyUseCase({ propertyEntity });

            if (response instanceof ValidationFailure) {
                return rejectWithValue("ValidationFailure")
            }

            if (response instanceof DuplicatedFailure) {
                return rejectWithValue("DuplicatedFailure")
            }

            if (response instanceof UnhandledFailure) {
                return rejectWithValue("UnhandledFailure")
            }

            return true

        } catch (error) {
            return rejectWithValue("An unexpected error occurred")
        }
    }
)


const postPropertySlice = createSlice({
    name: "postProperty",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postProperty.pending, (state, action) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(postProperty.fulfilled, (state) => {
                return {
                    ...initialState,
                }
            })
            .addCase(postProperty.rejected, (_, action) => {
                if (action.payload === "ValidationFailure") {
                    return {
                        ...initialState,
                        isValidationFailure: true,
                    }
                }
                if (action.payload === "DuplicatedFailure") {
                    return {
                        ...initialState,
                        isValidationFailure: true,
                    }
                }

                if (action.payload === "UnhandledFailure") {
                    return {
                        ...initialState,
                        isUnhandledFailure: true,
                    }
                }

                return {
                    ...initialState,
                    isUnhandledError: action.payload !== undefined,
                }
            })
    }
})
const postPropertyApiReducer = postPropertySlice.reducer
export default postPropertyApiReducer