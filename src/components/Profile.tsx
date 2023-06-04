import { useState } from "react" // react hooks

import { useDispatch, useSelector } from "react-redux" // redux
import { updateProfile } from "../redux/storeSlicer" // redux updateCity dispatch
import { RootState } from "../redux/store"

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

import allCities from "../assests/iranCities.json" // all iran cities

import { useTranslation } from "react-i18next" // translation i18n custom hook

const initalInput = { value: "", isEmpty: false }

const Profile = () => {
  const [userNameInput, setUserNameInput] = useState(initalInput) // name input value
  const [userThemeInput, setUserThemeInput] = useState(initalInput) // theme select value
  const [userCityInput, setUserCityInput] = useState(initalInput) // city select value
  const [isSubmited, setIsSubmited] = useState(false) // alert flag if submit happend

  const { lan } = useSelector((state: RootState) => state.storeReducer) // language from redux
  const dispatch = useDispatch() // redux dispatch
  const { t } = useTranslation() // t() from i18n

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userNameInput.value || !userThemeInput.value || !userCityInput.value)
      return //if one of the input values was empty return
    dispatch(
      updateProfile({
        user: userNameInput.value,
        theme: userThemeInput.value,
        city: userCityInput.value,
      })
    ) // update user profile
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
      {/* form */}
      <form onSubmit={handleSubmit} className=' space-y-10'>
        {/* snackbar */}
        <Snackbar open={isSubmited}>
          {/* success alert if user submited */}
          <Alert sx={{ width: "100%" }} severity='success'>
            {t("Profile Updated!")}
          </Alert>
        </Snackbar>
        {/* end of snackbar */}
        {/* form header */}
        <Typography
          sx={{ color: "secondary.main", fontWeight: 700 }}
          variant='h1'
          fontSize='2rem'
          align='center'
        >
          {t("User Profile")}
        </Typography>
        {/* end of form header */}

        {/* form elements container */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.2rem 0",
            color: "secondary.main",
          }}
        >
          {/* user input container */}
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
                    textAlign: lan === "fa" ? "right" : "left", // text input align base on language
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
            {/* form helper if user empty the value */}
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
          {/* end of user input container */}

          {/* theme select container */}
          <FormControl sx={{ display: "grid", gap: ".75rem 0" }}>
            {/* label */}
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
            {/* select */}
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
              {/* single option */}
              <MenuItem
                sx={{
                  justifyContent: lan === "fa" ? "flex-end" : "flex-start",
                }}
                value=''
              >
                {t("none")}
              </MenuItem>
              {/* single option */}
              <MenuItem
                sx={{
                  justifyContent: lan === "fa" ? "flex-end" : "flex-start",
                }}
                value='light'
              >
                {t("light")}
              </MenuItem>
              {/* single option */}
              <MenuItem
                sx={{
                  justifyContent: lan === "fa" ? "flex-end" : "flex-start",
                }}
                value='dark'
              >
                {t("dark")}
              </MenuItem>
            </Select>
            {/* form helper if user empty the value */}
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
          {/* end of theme select container */}

          {/* city select container */}
          <FormControl>
            {/* label */}
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
            {/* select */}
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
              {/* none option */}
              <MenuItem
                sx={{
                  justifyContent: lan === "fa" ? "flex-end" : "flex-start",
                }}
                value=''
              >
                {t("none")}
              </MenuItem>
              {/* allcities options */}
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
            {/* form helper if user empty the value */}
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
          {/* end of city select container */}
        </Box>
        {/* end of form elements container */}
        {/* submit btn */}
        <Button
          disabled={
            userNameInput.value && userThemeInput.value && userCityInput.value
              ? false
              : true
          } // disabled if all input was empty
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
      {/* end of form */}
    </Box>
  )
}
export default Profile
