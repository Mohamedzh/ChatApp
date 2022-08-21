import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "../../types";


const initialState: { new: number[], current: Conversation[], currentUserIds:number[] } = {
  new: [],
  current: [],
  currentUserIds: []
}


export const chatUsersSlice = createSlice({
  name: "chatUsers",
  initialState,
  reducers: {
    getChatUsers: (state, action: PayloadAction<number>) => {
      state.new.push(action.payload)
    },
    clearChatUsers: (state) => {
      state.new = []
    },
    addConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.current = (action.payload)
    },
    addUserIds: (state, action: PayloadAction<number[]>) => {
      state.currentUserIds = (action.payload)
    }
  }
})

export const { getChatUsers, clearChatUsers, addConversations, addUserIds } = chatUsersSlice.actions

export default chatUsersSlice.reducer