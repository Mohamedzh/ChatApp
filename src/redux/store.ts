import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/UserSlice";
import messagesSlice from "./features/messages-slice";
import conversationSlice from "./features/conversation-slice";
import allUsersSlice from "./features/allUsersSlice";
import chatUsersSlice from "./features/chatUsersSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messagesSlice,
    conversation: conversationSlice,
    allUsers: allUsersSlice,
    chatUsers: chatUsersSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch