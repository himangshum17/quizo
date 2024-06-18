import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./reducer/auth";

export const rootReducer = combineReducers({
  auth: authSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
