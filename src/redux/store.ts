import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/UserSlice";
import loggedInSlice from "./features/loggedIn-slice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    loggedIn: loggedInSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch