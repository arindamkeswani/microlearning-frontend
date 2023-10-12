import { configureStore } from "@reduxjs/toolkit";
import uploadReelSlice from "./slices/uploadReelsSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    uploadReel: uploadReelSlice,
    user: userSlice,
  },
});
