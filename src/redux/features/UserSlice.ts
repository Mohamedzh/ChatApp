import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  loggedIn: false,
  id: 0,
  firstName:''
}


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeTheUserState: (state, action: PayloadAction<{
      loggedIn: boolean,
      id: number,
      firstName: string
    }>) => {
      state.loggedIn = action.payload.loggedIn
      state.id = action.payload.id
      state.firstName = action.payload.firstName
    }
  }
})

export const { changeTheUserState } = userSlice.actions
export default userSlice.reducer