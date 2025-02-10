// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/UserSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Infer types for the store's state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
