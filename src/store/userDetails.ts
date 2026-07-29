import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
  isAuthenticated: false,
  token: null,
};

const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.userDetails = action.payload;
      state.isAuthenticated = true;
    },
    saveToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.userDetails = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { saveUserData, saveToken, logout } = userDataSlice.actions;
export default userDataSlice.reducer;
