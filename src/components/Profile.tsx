import { useState } from "react" // react hooks
import allCities from "../assests/iranCities.json"
import { useDispatch } from "react-redux" // redux
import { updateProfile } from "../redux/storeSlicer" // redux updateCity dispatch

import {
  FormControl,
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Select,
  FormHelperText,
  InputLabel,
} from "@mui/material" //mui

const Profile = () => {
  const [userNameInput, setUserNameInput] = useState("")
  const [userThemeInput, setUserThemeInput] = useState("")
  const [userCityInput, setUserCityInput] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userNameInput || !userThemeInput || !userCityInput) return //if inputvalue empty return
    dispatch(
      updateProfile({
        user: userNameInput,
        theme: userThemeInput,
        city: userCityInput,
      })
    ) // edit target todo
    setUserNameInput("") // empty textfield
    setUserThemeInput("") // empty textfield
    setUserCityInput("") // empty textfield
  } //handle Submit f()
  return (
    <form onSubmit={handleSubmit} className='space-y-10'>
      <Typography variant='h1' fontSize='2rem' align='center'>
        User Profile
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1rem 0",
        }}
      >
        <FormControl sx={{ display: "grid", gap: ".75rem 0" }}>
          <TextField
            value={userNameInput}
            onChange={(e) => setUserNameInput(e.target.value)}
            color='info'
            label='Name:'
            id='user-input'
          />
        </FormControl>
        <FormControl sx={{ display: "grid", gap: ".75rem 0" }}>
          <InputLabel
            sx={{ bgcolor: "primary.main", px: 0.2 }}
            color='secondary'
          >
            Theme:
          </InputLabel>
          <Select
            value={userThemeInput}
            onChange={(e) => setUserThemeInput(e.target.value)}
            id='theme-select'
            color='info'
          >
            <MenuItem value='light'>light</MenuItem>
            <MenuItem value='dark'>dark</MenuItem>
          </Select>
          <FormControl>
            <InputLabel
              color='secondary'
              sx={{ bgcolor: "primary.main", px: 0.2 }}
            >
              City:
            </InputLabel>
            <Select
              value={userCityInput}
              onChange={(e) => setUserCityInput(e.target.value)}
              id='city-select'
              color='info'
            >
              {allCities.cities.map((city, index) => {
                return (
                  <MenuItem key={index} value={city}>
                    {city}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </FormControl>
      </Box>
      <Button
        disabled={
          userNameInput && userThemeInput && userCityInput ? false : true
        }
        sx={{
          color: "green",
          display: "block",
          mx: "auto",
          p: 5,
          py: 1.5,
          fontSize: "1rem",
          ":hover": {
            bgcolor: "green",
            color: "primary.main",
          },
        }}
        type='submit'
      >
        Submit
      </Button>
    </form>
  )
}
export default Profile
