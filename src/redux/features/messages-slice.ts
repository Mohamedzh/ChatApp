import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../types';



const initialState: Message[] = []

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        messages:(state, action: PayloadAction<Message[]>) => {
           return action.payload
        }
    }
})

export const { messages } = messagesSlice.actions;
export default messagesSlice.reducer