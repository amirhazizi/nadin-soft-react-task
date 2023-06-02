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
export const initialState: InitialStateType = {
  user: "",
  theme: "light",
  city: "",
  todoList: {
    todos: [],
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
    addNewTodo: (state, action) => {
      const newTodo = { content: action.payload, id: new Date().getTime() }
      state.todoList.todos = [...state.todoList.todos, newTodo]
    },
    removeTodo: (state, action) => {
      const newTodos = state.todoList.todos.filter(
        (todo) => todo.id !== action.payload
      )
      state.todoList.todos = newTodos
    },
    resetTodos: (state) => {
      state.todoList.todos = []
    },
    startEditTodo: (state, action) => {
      state.todoList.isEdit = true
      state.todoList.editID = action.payload.id
      state.todoList.editContent = action.payload.content
    },
    finishEditTodo: (state, action) => {
      const newTodos = state.todoList.todos.map((todo) => {
        if (todo.id === state.todoList.editID)
          return { ...todo, content: action.payload }
        return todo
      })
      state.todoList.todos = newTodos
      state.todoList.isEdit = false
      state.todoList.editID = 0
      state.todoList.editContent = ""
    },
    getFromLocalStorage: (state, action) => {
      // for some reason state update like this!!!
      state.user = action.payload.user
      state.todoList = action.payload.todoList
      state.theme = action.payload.theme
      state.city = action.payload.city
    },
    updateCity: (state, action) => {
      state.city = action.payload
    },
    updateProfile: (state, action) => {
      state.user = action.payload.user
      state.theme = action.payload.theme
      state.city = action.payload.city
    },
    updateTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})
export const {
  updateUser,
  addNewTodo,
  removeTodo,
  resetTodos,
  finishEditTodo,
  startEditTodo,
  getFromLocalStorage,
  updateCity,
  updateProfile,
  updateTheme,
} = storeSlicer.actions
export default storeSlicer.reducer
