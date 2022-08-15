import { createSlice, PayloadAction} from '@reduxjs/toolkit';


const initialState = false

const loggedInSlice = createSlice({
    name: 'loggedIn',
    initialState,
    reducers: {
        logIn(state, action: PayloadAction<boolean>) {
            return state = action.payload
        }
    }
})

export const{ logIn} = loggedInSlice.actions;
export default loggedInSlice.reducer