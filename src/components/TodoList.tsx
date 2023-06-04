import { useState } from "react" // react

// Redux Toolkit
import { useSelector, useDispatch } from "react-redux"
import {
  addNewTodo,
  finishEditTodo,
  removeTodo,
  resetTodos,
  startEditTodo,
} from "../redux/storeSlicer" // redux dispatch methods
import { RootState } from "../redux/store" //state root type

// react icons
import { TiDelete } from "react-icons/ti" //delete icon
import { MdModeEditOutline } from "react-icons/md" // edit icon

import { lightTheme } from "../themes" // themes

import {
  Box,
  TextField,
  FormControl,
  Button,
  Typography,
  Card,
} from "@mui/material" // Mui

import { useAutoAnimate } from "@formkit/auto-animate/react" //autoAnimate

import { useTranslation } from "react-i18next" // translation i18n custom hook

const TodoList = () => {
  const [inputValue, setInputValue] = useState("") //textfield value
  const [isEmpty, setIsEmpty] = useState(false) //textfield empty flag
  const [parent] = useAutoAnimate() //auto animate ref

  const { theme, lan } = useSelector((state: RootState) => state.storeReducer) //theme and language redux state
  const { todos, editID: isEdit } = useSelector(
    (state: RootState) => state.storeReducer.todoList
  ) //todos and edit flag redux state
  const dispatch = useDispatch()

  const { t } = useTranslation() // t() from i18n
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue) return //if inputvalue empty return
    //new todo if !editflag
    if (!isEdit)
      dispatch(addNewTodo({ content: inputValue, id: new Date().getTime() }))
    else dispatch(finishEditTodo(inputValue)) // else edit target todo
    setInputValue("") // empty textfield
  } //handle Submit f()
  return (
    <Box
      sx={{
        display: "grid",
        gap: ".5rem 0",
        border: "2px solid transparent",
        borderColor: "secondary.main",
        color: "secondary.main",
        maxWidth: "25rem",
        mx: "auto",
        mt: "4rem",
        alignSelf: "start",
        [lightTheme.breakpoints.up("md")]: {
          maxWidth: "32rem",
          minWidth: "20rem",
        },
        [lightTheme.breakpoints.up("lg")]: {
          minWidth: "28rem",
        },
      }}
    >
      {/* header */}
      <Typography
        variant='h1'
        align='center'
        sx={{
          fontSize: "2rem",
          p: 1,
          fontWeight: 700,
          borderBottom: "2px solid transparent",
          borderColor: "secondary.main",
          [lightTheme.breakpoints.up("md")]: {
            fontSize: "2.5rem",
          },
        }}
      >
        {t("TODO List")}
      </Typography>
      {/* from */}
      <form className='p-4 ' onSubmit={handleSubmit}>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: lan === "en" ? "row" : "row-reverse",
            gap: "0 1rem",
            alignItems: "end",
            borderBottom: `${todos.length > 0 && "1px solid transparent"}`,
            pb: 4,
            borderColor: "secondary.main",
          }}
        >
          {/* input */}
          <TextField
            InputProps={{
              sx: {
                "& input": {
                  textAlign: lan === "fa" ? "right" : "left",
                },
              },
            }}
            sx={{
              width: "75%",
              borderBottom: "3px solid transparent",
              borderColor: "secondary.main",
              "& label": {
                color: "secondary.main",
                px: 0.2,
                fontWeight: 600,
                left: lan === "fa" ? "unset" : 0,
                right: lan === "fa" ? ".5rem" : 0,
              },
            }}
            variant='standard'
            label={t("new todo")}
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
            inputProps={{
              sx: {
                color: "secondary.main",
                paddingLeft: 1,
                fontSize: "1.2rem",
              },
            }}
          />
          {/* submit btn */}
          <Button
            disabled={inputValue ? false : true}
            sx={{
              alignSelf: "end",
              color: "green",
              width: "25%",
              fontSize: lan === "fa" ? "1.2rem" : ".9rem",
              ":hover": {
                bgcolor: "green",
                color: "primary.main",
              },
              ":disabled": {
                color: "primary.light",
              },
            }}
            type='submit'
          >
            {t("submit")}
          </Button>
        </FormControl>
      </form>
      {/* end of form */}

      {/* todos container */}
      {todos.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gap: "1rem 0",
            px: 1.7,
          }}
          ref={parent}
        >
          {todos.map(({ content, id }) => {
            return (
              // single todo
              <Card
                key={id}
                datatype={`${id}`}
                sx={{
                  display: "flex",
                  flexDirection: lan === "en" ? "row" : "row-reverse",
                  justifyContent: "space-between",
                  p: 2,
                  boxShadow: 0,
                  borderRadius: 0,
                  bgcolor: "primary.main",
                  color: "secondary.main",
                  border: "3px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderColor: "secondary.main",
                }}
              >
                {/* todo content */}
                <Typography sx={{ fontSize: "1.5rem" }}>{content}</Typography>
                {/* todos btn container */}
                <Box
                  sx={{
                    display: "flex",
                    gap: "0 .5rem",
                    flexDirection: lan === "en" ? "row" : "row-reverse",
                  }}
                >
                  {/* start edit single todo btn  */}
                  <button
                    onClick={() => {
                      dispatch(startEditTodo({ id, content }))
                      setInputValue(content)
                    }}
                    className='edit-btn p-2'
                  >
                    <MdModeEditOutline
                      className={`todo-btn transition-colors hover:fill-blue-600 ${
                        theme === "light" ? "fill-black " : "fill-white "
                      }`}
                    />
                  </button>
                  {/* delete single todo btn */}
                  <button
                    onClick={() => dispatch(removeTodo(id))}
                    className='delete-btn p-2'
                  >
                    <TiDelete
                      className={`todo-btn transition-colors hover:fill-red-600 ${
                        theme === "light" ? "fill-black " : "fill-white "
                      }`}
                    />
                  </button>
                </Box>
              </Card>
            )
          })}
          {/* clear todos btn */}
          <Button
            id='reset-btn'
            color='warning'
            sx={{
              display: "block",
              mx: "auto",
              my: 2,
              p: lan === "fa" ? 1.1 : 1.5,
              px: 3.5,
              fontSize: lan === "fa" ? "1.2rem" : ".9rem",
              border: "2px solid transparent",
              borderColor: "secondary.main",
              ":hover": {
                bgcolor: "red",
                color: "white",
              },
            }}
            onClick={() => dispatch(resetTodos())}
          >
            {t("Delete all Todos")}
          </Button>
        </Box>
      )}
      {/* end of todos container */}
    </Box>
  )
}
export default TodoList
