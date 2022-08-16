import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/UserSlice";
import messagesSlice from "./features/messages-slice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messagesSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch