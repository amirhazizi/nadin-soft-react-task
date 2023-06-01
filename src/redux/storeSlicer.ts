import { createSlice } from "@reduxjs/toolkit"

type InitialStateType = {
  user: string
  theme: "light" | "dark"
  city: string
  todoList: {
    todos: { content: string; id: number }[]
    isEdit: boolean
    editID: number
    editContent: string
  }
}
const initialState: InitialStateType = {
  user: "",
  theme: "light",
  city: "tehran",
  todoList: {
    todos: [{ content: "test", id: 5000 }],
    isEdit: false,
    editID: 0,
    editContent: "",
  },
}
export const storeSlicer = createSlice({
  name: "storeReducer",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload
    },
  },
})
export const { updateUser } = storeSlicer.actions
export default storeSlicer.reducer
