import { configureStore } from "@reduxjs/toolkit";
import protectionReducer from "./features/ProtectSlice";


export const store = configureStore({
  reducer: {
    protection: protectionReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch