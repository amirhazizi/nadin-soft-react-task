import { useState } from "react" //react hooks

import { useSelector, useDispatch } from "react-redux" // redux
import { updateUser } from "../redux/storeSlicer" // redux dispatch
import { RootState } from "../redux/store" // redux state type

import {
  Modal,
  FormControl,
  TextField,
  Button,
  Box,
  FormLabel,
} from "@mui/material" //mui staff

const UserModal = () => {
  const [userInput, setUserInput] = useState<string>() // input value
  const [isEmpty, setIsEmpty] = useState(false) // input empty checker

  const dispatch = useDispatch() //dispatch f()
  const user = useSelector((state: RootState) => state.storeReducer.user) // user state from redux

  const submitHandle = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput) return // return of input was empty
    dispatch(updateUser(userInput)) // update user name state with input value
  } // form submit handler

  return (
    <Modal open={user ? false : true}>
      {/* form */}
      <form className='user-form' onSubmit={submitHandle}>
        {/* form container */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "primary.main",
            boxShadow: 24,
            width: "70%",
            display: "flex",
            flexDirection: "column",
            p: "1rem",
            borderRadius: "1rem",
          }}
        >
          {/* label and input container */}
          <FormControl sx={{ my: "1rem" }}>
            {/* label */}
            <FormLabel htmlFor='input' sx={{ mb: 2 }}>
              Enter Your Username...
            </FormLabel>
            {/* input */}
            <TextField
              id='input'
              onChange={(e) => {
                const value = e.target.value
                setUserInput(value)
                setIsEmpty(() => {
                  if (value) return false
                  return true
                })
              }}
              error={isEmpty}
              label='username'
              variant='outlined'
              color='success'
            />
          </FormControl>
          {/* end of label and input container */}
          {/* submit btn */}
          <Button
            disabled={userInput ? false : true}
            sx={{
              color: "green",
              alignSelf: "center",
              p: 2,
              py: 1,
              ":hover": {
                bgcolor: "green",
                color: "primary.main",
              },
            }}
            type='submit'
          >
            submit
          </Button>
        </Box>
      </form>
      {/* end of form */}
    </Modal>
  )
}
export default UserModal
