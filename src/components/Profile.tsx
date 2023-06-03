import { useState } from "react" // react hooks
import allCities from "../assests/iranCities.json"
import { useDispatch, useSelector } from "react-redux" // redux
import { updateProfile } from "../redux/storeSlicer" // redux updateCity dispatch
import { RootState } from "../redux/store"

import { useTranslation } from "react-i18next"

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
  const { lan } = useSelector((state: RootState) => state.storeReducer)
  const [userNameInput, setUserNameInput] = useState(initalInput)
  const [userThemeInput, setUserThemeInput] = useState(initalInput)
  const [userCityInput, setUserCityInput] = useState(initalInput)
  const [isSubmited, setIsSubmited] = useState(false)
  const dispatch = useDispatch()
  const { t } = useTranslation()

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
          {t("User Profile")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.2rem 0",
            color: "secondary.main",
          }}
        >
          <FormControl sx={{ display: "grid", gap: ".75rem 0" }}>
            <TextField
              id='user-name'
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
              label={t("Name :")}
              InputProps={{
                sx: {
                  "& input": {
                    textAlign: lan === "fa" ? "right" : "left",
                  },
                },
              }}
              sx={{
                bgcolor: "white",
                borderRadius: 1,
                "& label": {
                  color: "primary.light",
                  bgcolor: "white",
                  px: 0.2,
                  left: lan === "fa" ? "unset" : 0,
                  right: lan === "fa" ? "2rem" : 0,
                  fontWeight: lan === "fa" ? 700 : 500,
                  fontSize: lan === "fa" ? "1.25rem" : "1rem",
                },
              }}
            />
            {userNameInput.isEmpty && (
              <FormHelperText
                sx={{
                  m: 0,
                  mt: -1,
                  color: "red",
                  textAlign: lan === "fa" ? "right" : "left",
                }}
              >
                {t("Please enter your name")}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ display: "grid", gap: ".75rem 0" }}>
            <InputLabel
              error={userThemeInput.isEmpty}
              sx={{
                color: "primary.light",
                bgcolor: "white",
                px: 0.2,
                width: lan === "fa" ? "1.7rem" : "4rem",
                left: lan === "fa" ? "unset" : 0,
                right: lan === "fa" ? "3rem" : 0,
                fontWeight: lan === "fa" ? 700 : 500,
                fontSize: lan === "fa" ? "1.1rem" : "1rem",
              }}
              color='info'
            >
              {t("Theme :")}
            </InputLabel>
            <Select
              sx={{
                bgcolor: "white",
                textAlign: lan === "fa" ? "right" : "left",
              }}
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
              <MenuItem
                sx={{
                  justifyContent: lan === "fa" ? "flex-end" : "flex-start",
                }}
                value=''
              >
                {t("none")}
              </MenuItem>
              <MenuItem
                sx={{
                  justifyContent: lan === "fa" ? "flex-end" : "flex-start",
                }}
                value='light'
              >
                {t("light")}
              </MenuItem>
              <MenuItem
                sx={{
                  justifyContent: lan === "fa" ? "flex-end" : "flex-start",
                }}
                value='dark'
              >
                {t("dark")}
              </MenuItem>
            </Select>
            {userThemeInput.isEmpty && (
              <FormHelperText
                sx={{
                  m: 0,
                  mt: -1,
                  color: "red",
                  textAlign: lan === "fa" ? "right" : "left",
                }}
              >
                {t("Please choose your theme")}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <InputLabel
              color='info'
              error={userCityInput.isEmpty}
              sx={{
                color: "primary.light",
                bgcolor: "white",
                px: 0.2,
                left: lan === "fa" ? "unset" : 0,
                right: lan === "fa" ? "3rem" : 0,
                fontSize: lan === "fa" ? "1.1rem" : "1rem",
                width: lan === "fa" ? "2.6rem" : "2.6rem",
              }}
            >
              {t("City :")}
            </InputLabel>
            <Select
              sx={{
                bgcolor: "white",
                textAlign: lan === "fa" ? "right" : "left",
              }}
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
              <MenuItem
                sx={{
                  justifyContent: lan === "fa" ? "flex-end" : "flex-start",
                }}
                value=''
              >
                {t("none")}
              </MenuItem>
              {allCities.cities.map((city, index) => {
                return (
                  <MenuItem
                    sx={{
                      justifyContent: lan === "fa" ? "flex-end" : "flex-start",
                    }}
                    key={index}
                    value={city}
                  >
                    {t(city)}
                  </MenuItem>
                )
              })}
            </Select>
            {userCityInput.isEmpty && (
              <FormHelperText
                sx={{
                  m: 0,
                  mt: 0.5,
                  color: "red",
                  textAlign: lan === "fa" ? "right" : "left",
                }}
              >
                {t("Please choose your city")}
              </FormHelperText>
            )}
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
            fontSize: lan === "fa" ? "1.3rem" : "1rem",
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
      </form>
    </Box>
  )
}
export default Profile
