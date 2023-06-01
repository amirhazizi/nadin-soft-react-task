import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  Modal,
  FormControl,
  TextField,
  Button,
  Box,
  Typography,
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
            display: "grid",
            p: "1rem",
            borderRadius: "1rem",
          }}
        >
          <Typography>Enter Your Username...</Typography>
          <FormControl sx={{ my: "1rem" }}>
            <TextField
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
              color='info'
            />
          </FormControl>
          <Button sx={{ color: "green" }} type='submit'>
            submit
          </Button>
        </Box>
      </form>
    </Modal>
  )
}
export default UserModal
