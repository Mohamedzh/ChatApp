import {configureStore} from '@reduxjs/toolkit';
import loggedInSlice from '../redux/loggedIn-slice';

export const store = configureStore({
    reducer: {
        loggedIn: loggedInSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;