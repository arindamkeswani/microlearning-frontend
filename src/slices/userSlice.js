import { createSlice } from "@reduxjs/toolkit";
import { isValidJSON } from "../utils";

const initialState = {
  user:
    localStorage.getItem("user-details") &&
    isValidJSON(localStorage.getItem("user-details"))
      ? JSON.parse(localStorage.getItem("user-details"))
      : {},
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action?.payload;
      localStorage.setItem("user-details", JSON.stringify(action?.payload));
    },

    logout: (state, action) => {
      state.user = {};
      localStorage.removeItem("user-details");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
