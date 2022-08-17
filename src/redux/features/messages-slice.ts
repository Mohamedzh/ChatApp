import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../types';


const initialState: Message[] = []

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        messages: (state, action: PayloadAction<Message[]>) => {
            return action.payload
        },
        socketMessages: (state, action: PayloadAction<Message>) => {
            state.push(action.payload)
        }
    }
})

export const { messages, socketMessages } = messagesSlice.actions;
export default messagesSlice.reducer