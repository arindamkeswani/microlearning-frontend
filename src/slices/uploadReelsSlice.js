import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const uploadReelSlice = createSlice({
  name: "UploadReel",
  initialState,
  reducers: {
    updateState: (state, action) => {
      const newState = action.payload;
      Object.assign(state, newState);
    },
    removeState: (state, payload) => {
      return initialState;
    },
  },
});

export const { updateState, removeState } = uploadReelSlice.actions;

export default uploadReelSlice.reducer;
