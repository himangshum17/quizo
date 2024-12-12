import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userObject: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLoggedIn = true;
      state.userObject = action.payload;
    },
    userLogout: (state, action) => {
      state.isLoggedIn = false;
      state.userObject = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { userLogin, userLogout } = authSlice.actions;
