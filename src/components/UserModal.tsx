import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  Modal,
  FormControl,
  TextField,
  Button,
  Box,
  Typography,
  FormLabel,
} from "@mui/material"
import { updateUser } from "../redux/storeSlicer"
import { RootState } from "../redux/store"
const UserModal = () => {
  const [userInput, setUserInput] = useState("")
  const [isEmpty, setIsEmpty] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.storeReducer.user)

  const submitHandle = (e: React.FormEvent) => {
    e.preventDefault()

    if (!userInput) return
    dispatch(updateUser(userInput))
  }

  return (
    <Modal open={user ? false : true}>
      <form className='user-form' onSubmit={submitHandle}>
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
          <FormControl sx={{ my: "1rem" }}>
            <FormLabel htmlFor='input' sx={{ mb: 2 }}>
              Enter Your Username...
            </FormLabel>
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
          <Button
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
    </Modal>
  )
}
export default UserModal
