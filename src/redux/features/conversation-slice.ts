import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation } from '../../types';

const initialState: Conversation[] = []

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    getChat: (state, action: PayloadAction<Conversation[]>) => {
      return action.payload
    }
  }

})

export const { getChat } = conversationSlice.actions
export default conversationSlice.reducer