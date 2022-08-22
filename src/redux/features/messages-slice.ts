import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../types';


const initialState: {allMessages:Message[], chatMessages:Message[]} = {
    allMessages:[],
    chatMessages:[]
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
        }
    }
})

export const { messages, socketMessages } = messagesSlice.actions;
export default messagesSlice.reducer