import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";


const initialState: User[] = []


export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    getAllUsers: (state, action: PayloadAction<User[]>) => {
      return action.payload
    },
    addFromUsers: (state, action: PayloadAction<number>) => {
      state.filter(user=>user.id!==action.payload)
    }
  }
})

export const { getAllUsers,addFromUsers } = allUsersSlice.actions

export default allUsersSlice.reducer