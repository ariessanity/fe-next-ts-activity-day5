import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const STORE_NAME = "auth";
const hydrate = createAction(HYDRATE);

interface AuthState {
  authState: boolean;
}

const initialState: AuthState = {
  authState: false,
};

export const authSlice = createSlice({
  name: STORE_NAME,
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.authState = !action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => ({
      ...state,
      ...(action.payload?.[STORE_NAME] as unknown as Partial<AuthState>),
    }));
  },
});

export const { setAuthState } = authSlice.actions;
