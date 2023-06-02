import { useState } from "react" // react

// Redux Toolkit
import { useSelector, useDispatch } from "react-redux"
import {
  addNewTodo,
  finishEditTodo,
  removeTodo,
  resetTodos,
  startEditTodo,
} from "../redux/storeSlicer"
import { RootState } from "../redux/store"

// react icons
import { TiDelete } from "react-icons/ti"
import { MdModeEditOutline } from "react-icons/md"

import {
  Box,
  TextField,
  FormControl,
  Button,
  Typography,
  Card,
} from "@mui/material" // Mui

import { useAutoAnimate } from "@formkit/auto-animate/react" //autoAnimate

const TodoList = () => {
  const todos = useSelector(
    (state: RootState) => state.storeReducer.todoList.todos
  ) //todos redux state
  const isEdit = useSelector(
    (state: RootState) => state.storeReducer.todoList.editID
  ) //isEdir flag redux state
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState<string>() //textfield value
  const [isEmpty, setIsEmpty] = useState(false) //textfield empty flag
  const [parent] = useAutoAnimate() //auto animate ref
  const handleSubmit = (e: React.FormEvent) => {
    //handle Submit f()
    e.preventDefault()
    if (!inputValue) return //if inputvalue empty return
    if (!isEdit) dispatch(addNewTodo(inputValue)) //new todo if !editflag
    else dispatch(finishEditTodo(inputValue)) // edit target todo
    setInputValue("") // empty textfield
  }
  return (
    <Box sx={{ display: "grid", gap: ".5rem 0", border: "2px solid black" }}>
      {/* header */}
      <Typography
        variant='h1'
        align='center'
        sx={{
          fontSize: "2rem",
          p: 1,
          fontWeight: 700,
          borderBottom: "2px solid black",
        }}
      >
        TODO List
      </Typography>
      {/* from */}
      <form className='p-4 ' onSubmit={handleSubmit}>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "0 1rem",
            alignItems: "end",
            borderBottom: `${todos.length > 0 && "1px solid transparent"}`,
            pb: 4,
            borderColor: "secondary.main",
          }}
        >
          <TextField
            sx={{ width: "75%" }}
            variant='standard'
            label='new todos'
            error={isEmpty}
            color='success'
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value
              setInputValue(value)
              setIsEmpty(() => {
                if (value) return false
                return true
              })
            }}
          />
          <Button
            sx={{
              color: "green",
              width: "20%",
              ":hover": {
                bgcolor: "green",
                color: "primary.main",
              },
            }}
            type='submit'
          >
            Submit
          </Button>
        </FormControl>
      </form>
      {/* todos container */}
      {todos.length > 0 && (
        <Box ref={parent}>
          {todos.map(({ content, id }) => {
            return (
              // single todo
              <Card
                key={id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 2,
                  boxShadow: 0,
                }}
              >
                {/* todo content */}
                <Typography variant='h4'>{content}</Typography>
                {/* todos btn container */}
                <Box sx={{ display: "flex", gap: "0 .5rem" }}>
                  {/* start edit single todo btn  */}
                  <button
                    onClick={() => {
                      dispatch(startEditTodo({ id, content }))
                      setInputValue(content)
                    }}
                    className='p-2'
                  >
                    <MdModeEditOutline className='todo-btn fill-black' />
                  </button>
                  {/* delete single todo btn */}
                  <button
                    onClick={() => dispatch(removeTodo(id))}
                    className='p-2'
                  >
                    <TiDelete className='todo-btn fill-black' />
                  </button>
                </Box>
              </Card>
            )
          })}
          {/* clear todos btn */}
          <Button
            color='warning'
            sx={{ display: "block", mx: "auto", my: 2, p: 2, px: 4 }}
            onClick={() => dispatch(resetTodos())}
          >
            Delete add Todos
          </Button>
        </Box>
      )}
    </Box>
  )
}
export default TodoList
