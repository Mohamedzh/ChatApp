import { configureStore } from "@reduxjs/toolkit";
import protectionReducer from "./features/ProtectSlice";
import loggedInSlice from "./features/loggedIn-slice";


export const store = configureStore({
  reducer: {
    protection: protectionReducer,
    loggedIn: loggedInSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch