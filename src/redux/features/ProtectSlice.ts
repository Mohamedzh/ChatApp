import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = false


export const protectSlice = createSlice({
  name: "protection",
  initialState,
  reducers: {
    changeTheProtectionValue: (state, action: PayloadAction<boolean>) => {
      return action.payload
    }
  }
})

export const { changeTheProtectionValue } = protectSlice.actions

export default protectSlice.reducer