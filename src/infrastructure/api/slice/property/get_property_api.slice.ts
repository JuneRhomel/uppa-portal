import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PropertiesEntity from "../../module/property/domain/entity/properties.entity";
import GetPropertyUseCase from "../../module/property/domain/use_case/get_property.use_case";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";

interface apiStates {
    isLoading: boolean,
    isAlreadyExist: boolean,
    isError: boolean,
}


const initialState: apiStates = {
    isLoading: false,
    isAlreadyExist: false,
    isError: false,
}


export const getProperty = createAsyncThunk<
    PropertiesEntity,
    number,
    {
        rejectValue: string;
    }
>(
    "properties/getProperty",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await GetPropertyUseCase({ id });

            if (response instanceof UnhandledFailure) {
                return rejectWithValue("UnhandledFailure");
            }

            return response as PropertiesEntity;
        } catch (error) {
            return rejectWithValue("An unexpected error occurred");
        }
    }
)


const getPropertySlice = createSlice({
    name: "getProperty",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProperty.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(getProperty.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    property: action.payload,
                }
            })
            .addCase(getProperty.rejected, (state, action) => {
                if (action.payload === "UnhandledFailure") {
                    return {
                        ...initialState,
                        isError: true,
                    }
                }
            })
    }
})

const getPropertyApiSliceReducer = getPropertySlice.reducer

export default getPropertyApiSliceReducer