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
  },
});

export const { updateState } = uploadReelSlice.actions;

export default uploadReelSlice.reducer;
