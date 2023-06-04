import { useState, useEffect } from "react" // react hooks

import { useSelector, useDispatch } from "react-redux" // redux
import { RootState } from "../redux/store" //rootState type
import { updateweather } from "../redux/storeSlicer" // redux updateCity dispatch

import {
  FormControl,
  TextField,
  Button,
  Box,
  Alert,
  Snackbar,
} from "@mui/material" //mui

import axios from "axios" //axios

import { lightTheme } from "../themes" // themes

import WeatherCard from "./WeatherCard" //weather card

import { useTranslation } from "react-i18next" // translation i18n custom hook

const baseGetWeatherURL = "https://api.open-meteo.com/v1" //baseURL getWeather
const baseGetLocationURL = "https://geocoding-api.open-meteo.com/v1/" //baseURL getlocation by city

const autoGetLocationFetch = axios.create({
  baseURL: baseGetLocationURL,
  headers: { Accept: "application/json" },
}) // custom axios for location req
const autoGetWeatherFetch = axios.create({
  baseURL: baseGetWeatherURL,
  headers: { Accept: "application/json" },
}) // custom axios for weather req

const Weathermeteo = () => {
  const {
    lan,
    weather: { city, code, temperature, uploadTime },
  } = useSelector((state: RootState) => state.storeReducer) //weather and langugage state from redux
  const dispatch = useDispatch() //dispatch

  const [userInput, setUserInput] = useState("") // input value
  const [isEmpty, setIsEmpty] = useState(false) //textfield empty flag
  const [isLoading, setIsLoading] = useState(false) // loadingBar toggle
  const { t } = useTranslation() // t() from i18n

  const fetchWeather = async (cityParam: string) => {
    setIsLoading(true) //show loading bar
    try {
      const { data: locData } = await autoGetLocationFetch(
        `/search?name=${cityParam}&count=1`
      ) // get location info from cityParam
      const { latitude, longitude } = locData.results[0] //select props
      const {
        data: {
          current_weather: { temperature, weathercode },
        },
      } = await autoGetWeatherFetch(
        `/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      ) // get weather details from city location

      dispatch(
        updateweather({
          city: cityParam,
          temperature,
          code: weathercode,
          uploadTime: new Date().getTime(),
        })
      ) // update city weather details

      setIsLoading(false) // unshow loadingBar
    } catch (error) {
      console.log(error) //show error if request failed
      setIsLoading(false) // unshow loadingBar
    }
  } // fetch weather from city name

  useEffect(() => {
    if (uploadTime + 3600000 <= new Date().getTime()) {
      city && fetchWeather(city)
    } // every hour city status updates
  }, [city]) // run scope if city state changes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput) return //return if input was empty
    fetchWeather(userInput) //update user city in redux
    setUserInput("") // clear input value
  } // submit form handle f()
  return (
    <Box
      sx={{
        display: "grid",
        gap: "4rem 0",
        maxWidth: "25rem",
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
      <form onSubmit={handleSubmit}>
        {/* form container */}
        <FormControl
          sx={{
            display: "flex",
            flexDirection: lan === "en" ? "row" : "row-reverse",
            justifyContent: "space-between",
            gap: "0 1.5rem",
          }}
        >
          {/* input */}
          <TextField
            value={userInput}
            error={isEmpty}
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
            onChange={(e) => {
              const value = e.target.value
              setUserInput(value)
              setIsEmpty(() => {
                if (value) return false
                return true
              })
            }}
            variant='standard'
            label={t("Enter City")}
            color='success'
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
            disabled={userInput ? false : true}
            sx={{
              color: "green",
              alignSelf: "end",
              p: 3,
              py: 1,
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

      {/* weather container */}
      <Box sx={{ display: "grid", placeContent: "center" }}>
        {/* weather card */}
        {city && (
          <WeatherCard
            isLoading={isLoading}
            city={city}
            temperature={temperature}
            code={code}
          />
        )}
        {/* end of weather card */}
      </Box>
      {/* end of wheather container */}
      <Snackbar open={isLoading}>
        {/* success alert if user submited */}
        <Alert sx={{ width: "100%" }} severity='info'>
          {t("Please Wait")}
        </Alert>
      </Snackbar>
    </Box>
  )
}
export default Weathermeteo
