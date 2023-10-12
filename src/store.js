import { configureStore } from "@reduxjs/toolkit";
import uploadReelSlice from "./slices/uploadReelsSlice";

export const store = configureStore({
  reducer: {
    uploadReel: uploadReelSlice,
  },
});
