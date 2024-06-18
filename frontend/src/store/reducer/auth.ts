import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { userLogin } = authSlice.actions;
