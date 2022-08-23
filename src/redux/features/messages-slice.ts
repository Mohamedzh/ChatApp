import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../types';


const initialState: { allMessages: Message[], chatMessages: Message[] } = {
    allMessages: [],
    chatMessages: []
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        messages: (state, action: PayloadAction<Message[]>) => {
            state.allMessages = action.payload
        },
        socketMessages: (state, action: PayloadAction<Message>) => {
            state.allMessages.push(action.payload)
        },
        chatMessages: (state, action: PayloadAction<Message[]>) => {
            state.chatMessages = action.payload
        },
        chatSocketMessages: (state, action: PayloadAction<Message>) => {
            state.chatMessages.push(action.payload)
        },
        clearChatMessages: (state) => {
            state.chatMessages = []
        }
    }
})

export const { messages, socketMessages, chatMessages, clearChatMessages, chatSocketMessages } = messagesSlice.actions;
export default messagesSlice.reducer