import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  loggedIn: false,
  name: ""
}


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeTheUserState: (state, action: PayloadAction<{
      loggedIn: boolean;
      name: string;
    }>) => {
      state.loggedIn = action.payload.loggedIn
      state.name = action.payload.name

    }
  }
})

export const { changeTheUserState } = userSlice.actions

export default userSlice.reducer