import { AppState } from "../../store/store";
import { authSlice } from "../../store/auth/authSlice";

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;
