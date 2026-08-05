import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
  isAuthenticated: false,
  token: null,
  refreshToken: null,
};

const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.userDetails = action.payload.user;
      state.isAuthenticated = true;
      state.refreshToken = action.payload.refreshToken;
    },
    saveToken: (state, action) => {
      state.token = action.payload;
    },
    saveRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    logout: (state) => {
      state.userDetails = null;
      state.token = null;
      state.isAuthenticated = false;
      state.refreshToken = null;
    },
  },
});

export const { saveUserData, saveToken, saveRefreshToken, logout } =
  userDataSlice.actions;
export default userDataSlice.reducer;
