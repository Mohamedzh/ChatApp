import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  loggedIn: false,
  id: 0
}


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeTheUserState: (state, action: PayloadAction<{
      loggedIn: boolean;
      id: number;
    }>) => {
      state.loggedIn = action.payload.loggedIn
      state.id = action.payload.id

    }
  }
})

export const { changeTheUserState } = userSlice.actions

export default userSlice.reducer