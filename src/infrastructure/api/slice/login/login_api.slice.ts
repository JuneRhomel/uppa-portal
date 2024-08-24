import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UnhandledFailure from "../../../../application/failure/unhandled.failure";
import InactiveAccountFailure from "../../module/login/domain/failure/inactive_account.failure";
import LockedAccountFailure from "../../module/login/domain/failure/locked_account.failure";
import LoginFailure from "../../module/login/domain/failure/login.failure";
import LoginUseCaseParams from "../../module/login/domain/use_case/interface/login_use_case.params";
import LoginUseCase from "../../module/login/domain/use_case/login.use_case";

interface apiStates {
    isLoading: boolean,
    isUnhandledFailure: boolean,
    isLoginFailure: boolean,
    isInactiveAccountFailure: boolean,
    isLockedAccountFailure: boolean,
    LoginFailure: boolean,
}

const initialState: apiStates = {
    isLoading: false,
    isUnhandledFailure: false,
    isLoginFailure: false,
    isInactiveAccountFailure: false,
    isLockedAccountFailure: false,
    LoginFailure: false
}


export const loginCredential = createAsyncThunk<
    boolean,
    LoginUseCaseParams,
    {
        rejectValue: string;
    }
>(
    "login/login",
    async (params: LoginUseCaseParams, { rejectWithValue }) => {
        const response = await LoginUseCase(params);

        if (response instanceof LoginFailure) {
            return rejectWithValue("IsLoginFailure")
        }

        if (response instanceof InactiveAccountFailure) {
            return rejectWithValue("IsInactiveAccountFailure")
        }

        if (response instanceof LockedAccountFailure) {
            return rejectWithValue("IsLockedAccountFailure")
        }

        if (response instanceof UnhandledFailure) {
            return rejectWithValue("UnhandledFailure")
        }

        return true

    }
)


const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginCredential.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(loginCredential.fulfilled, (state) => {
                return {
                    ...initialState,
                    isLoading: false,
                }
            })
            .addCase(loginCredential.rejected, (_, action) => {
                if (action.payload === "IsLoginFailure") {
                    return {
                        ...initialState,
                        isLoginFailure: true,
                    }
                }

                if (action.payload === "IsInactiveAccountFailure") {
                    return {
                        ...initialState,
                        isInactiveAccountFailure: true,
                    }
                }

                if (action.payload === "IsLockedAccountFailure") {
                    return {
                        ...initialState,
                        isLockedAccountFailure: true,
                    }
                }

                if (action.payload === "UnhandledFailure") {
                    return {
                        ...initialState,
                        isLoading: false,
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

const loginApiSliceReducer = loginSlice.reducer

export default loginApiSliceReducer