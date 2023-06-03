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
  Snackbar,
  Alert,
} from "@mui/material" //mui

import { lightTheme } from "../themes" // themes

const initalInput = { value: "", isEmpty: false }

const Profile = () => {
  const [userNameInput, setUserNameInput] = useState(initalInput)
  const [userThemeInput, setUserThemeInput] = useState(initalInput)
  const [userCityInput, setUserCityInput] = useState(initalInput)
  const [isSubmited, setIsSubmited] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userNameInput.value || !userThemeInput.value || !userCityInput.value)
      return //if inputvalue empty return
    dispatch(
      updateProfile({
        user: userNameInput.value,
        theme: userThemeInput.value,
        city: userCityInput.value,
      })
    ) // edit target todo
    setUserNameInput(initalInput) // empty name textfield
    setUserThemeInput(initalInput) // empty theme textfield
    setUserCityInput(initalInput) // empty city textfield
    setIsSubmited(true) // show alert
    setTimeout(() => {
      setIsSubmited(false)
    }, 2500) // unshow alert after 2.5s
  } //handle Submit f()
  return (
    <Box
      sx={{
        maxWidth: "30rem",
        mx: "auto",
        pt: "4rem",
        alignSelf: "start",
        [lightTheme.breakpoints.up("md")]: {
          maxWidth: "35rem",
          minWidth: "20rem",
        },
      }}
    >
      <form onSubmit={handleSubmit} className=' space-y-10'>
        <Snackbar open={isSubmited}>
          <Alert sx={{ width: "100%" }} severity='success'>
            Profile Updated!
          </Alert>
        </Snackbar>
        <Typography
          sx={{ color: "secondary.main", fontWeight: 700 }}
          variant='h1'
          fontSize='2rem'
          align='center'
        >
          User Profile
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: ".75rem 0",
            color: "secondary.main",
          }}
        >
          <FormControl sx={{ display: "grid", gap: ".75rem 0" }}>
            <TextField
              value={userNameInput.value}
              onChange={(e) =>
                setUserNameInput(() => {
                  const value = e.target.value
                  if (value) return { value, isEmpty: false }
                  return { value, isEmpty: true }
                })
              }
              error={userNameInput.isEmpty}
              color={`${userNameInput.isEmpty ? "error" : "info"}`}
              label='Name :'
              sx={{
                bgcolor: "white",
                borderRadius: 1,
                "& label": {
                  color: "primary.light",
                  bgcolor: "white",
                  px: 0.2,
                },
              }}
            />
            {userNameInput.isEmpty && (
              <FormHelperText sx={{ m: 0, mt: -1, color: "red" }}>
                Please enter your name
              </FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ display: "grid", gap: ".75rem 0" }}>
            <InputLabel
              error={userThemeInput.isEmpty}
              sx={{ color: "primary.light", bgcolor: "white", px: 0.2 }}
              color='info'
            >
              Theme :
            </InputLabel>
            <Select
              sx={{ bgcolor: "white" }}
              value={userThemeInput.value}
              onChange={(e) =>
                setUserThemeInput(() => {
                  const value = e.target.value
                  if (value) return { value, isEmpty: false }
                  return { value, isEmpty: true }
                })
              }
              id='theme-select'
              color={`${userThemeInput.isEmpty ? "error" : "info"}`}
              error={userThemeInput.isEmpty}
            >
              <MenuItem value=''>none</MenuItem>
              <MenuItem value='light'>light</MenuItem>
              <MenuItem value='dark'>dark</MenuItem>
            </Select>
            {userThemeInput.isEmpty && (
              <FormHelperText sx={{ m: 0, mt: -1, color: "red" }}>
                Please choose your theme
              </FormHelperText>
            )}
            <FormControl>
              <InputLabel
                color='info'
                error={userCityInput.isEmpty}
                sx={{
                  color: "primary.light",
                  bgcolor: "white",
                  px: 0.2,
                }}
              >
                City :
              </InputLabel>
              <Select
                sx={{ bgcolor: "white" }}
                value={userCityInput.value}
                onChange={(e) =>
                  setUserCityInput(() => {
                    const value = e.target.value
                    if (value) return { value, isEmpty: false }
                    return { value, isEmpty: true }
                  })
                }
                id='city-select'
                color={`${userCityInput.isEmpty ? "error" : "info"}`}
                error={userCityInput.isEmpty}
              >
                <MenuItem value=''>none</MenuItem>
                {allCities.cities.map((city, index) => {
                  return (
                    <MenuItem key={index} value={city}>
                      {city}
                    </MenuItem>
                  )
                })}
              </Select>
              {userCityInput.isEmpty && (
                <FormHelperText sx={{ m: 0, mt: 0.5, color: "red" }}>
                  Please choose your city
                </FormHelperText>
              )}
            </FormControl>
          </FormControl>
        </Box>
        <Button
          disabled={
            userNameInput.value && userThemeInput.value && userCityInput.value
              ? false
              : true
          }
          variant='contained'
          sx={{
            color: "green",
            display: "block",
            mx: "auto",
            p: 6,
            py: 1.5,
            boxShadow: 7,
            fontSize: "1rem",
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
          Submit
        </Button>
      </form>
    </Box>
  )
}
export default Profile
