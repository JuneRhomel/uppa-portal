import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ListPropertiesEntity from "../../module/property/domain/entity/list_properties.entity";
import PaginationEntity from "../../../../application/entity/pagination.entity";
import PropertiesUseCase from "../../module/property/domain/use_case/properties.use_case";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import Failure from "../../../../application/failure/failure";
import { instanceToPlain } from "class-transformer";

interface apiStates {
    isLoading: boolean,
    isError: boolean,
}

const initialState: apiStates = {
    isLoading: false,
    isError: false,
}


export const getPropertyList = createAsyncThunk<
    ListPropertiesEntity,
    PaginationEntity,
    {
        rejectValue: string;
    }
>(
    "properties/getPropertyList",
    async (paginationEntity: PaginationEntity, { rejectWithValue }) => {
        const response = await PropertiesUseCase({ paginationEntity });

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        if (response instanceof Failure) {
            return rejectWithValue("Failure")
        }


        return instanceToPlain(response) as ListPropertiesEntity
    }
)

const getPropertyListSlice = createSlice({
    name: "getPropertyList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPropertyList.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(getPropertyList.fulfilled, (state, action) => {
                return {
                    ...initialState,
                    propertyList: action.payload,
                }
            })
            .addCase(getPropertyList.rejected, (state, action) => {

                if (action.payload === "UnhandledFailure") {
                    return {
                        ...initialState,
                        isError: true,
                    }
                }
                if (action.payload === "Failure") {
                    return {
                        ...initialState,
                        isError: true,
                    }
                }
                return {
                    ...initialState,
                    isUnhandledError: action.payload !== undefined,
                };
            })
    }
})

const getPropertyListApiReducer = getPropertyListSlice.reducer
export default getPropertyListApiReducer