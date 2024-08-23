import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import DeletePropertyUseCase from "../../module/property/domain/use_case/delete_property.use_case";


interface apiStates {
    isLoading: boolean,
    isUnhandledFailure: boolean,
}


const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false,
}


export const deleteProperty = createAsyncThunk<
    boolean,
    number,
    {
        rejectValue: string;
    }
>(
    "properties/deleteProperty",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await DeletePropertyUseCase({ id });

            if (response instanceof UnhandledFailure) {
                return rejectWithValue("UnhandledFailure");
            }

            return true;
        } catch (error) {
            return rejectWithValue("An unexpected error occurred");
        }
    }
)


const deletePropertySlice = createSlice({
    name: "deleteProperty",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteProperty.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(deleteProperty.fulfilled, (state) => {
                return {
                    ...initialState,
                    isLoading: false,
                }
            })
            .addCase(deleteProperty.rejected, (state, action) => {
                if (action.payload === "UnhandledFailure") {
                    return {
                        ...initialState,
                        isUnhandledFailure: true,
                    }
                }
            })
    }
})

const deletePropertyApiSliceReducer = deletePropertySlice.reducer;

export default deletePropertyApiSliceReducer