import { useState, useEffect } from "react" // react hooks

import { useSelector, useDispatch } from "react-redux" // redux
import { RootState } from "../redux/store" //rootState type
import { updateCity } from "../redux/storeSlicer" // redux updateCity dispatch

import {
  FormControl,
  TextField,
  Button,
  Box,
  Card,
  Typography,
} from "@mui/material" //mui

import axios from "axios" //axios

import weatherCodeChecker from "../weatherCodeChecker" //weather code to weather type f()

import loadingBar from "../assests/Eclipse-loading.svg?url" // svg animate loading bar

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

const intialCity = { city: "loading...", temp: -1, weather: "loading" } // initial state for initial page render

const Weathermeteo = () => {
  const city = useSelector((state: RootState) => state.storeReducer.city) //city state from redux
  const dispatch = useDispatch() //dispatch
  const [userCity, setUserCity] = useState(intialCity) //city weather info
  const [userInput, setUserInput] = useState("") // input value
  const [isEmpty, setIsEmpty] = useState(false) //textfield empty flag
  const [isLoading, setIsLoading] = useState(true) // loadingBar toggle

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

      setUserCity({
        city: cityParam,
        temp: temperature,
        weather: weatherCodeChecker(weathercode),
      }) // update city weather details
      setIsLoading(false) // unshow loadingBar
    } catch (error) {
      console.log(error) //show error if request failed
      setIsLoading(false) // unshow loadingBar
    }
  } // fetch weather from city name
  useEffect(() => {
    fetchWeather(city)
    console.log(city)
  }, [city]) // run scope if city state changes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput) return //return if input was empty
    dispatch(updateCity(userInput)) //update user city in redux
    setUserInput("") // clear input value
  } // submit form handle f()
  return (
    <Box sx={{ display: "grid", gap: "4rem 0" }}>
      {/* form */}
      <form onSubmit={handleSubmit}>
        {/* form container */}
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "0 1.5rem",
          }}
        >
          {/* input */}
          <TextField
            value={userInput}
            error={isEmpty}
            sx={{
              width: "75%",
              "& label": { color: "secondary.main", px: 0.2 },
              borderBottom: "3px solid transparent",
              borderColor: "secondary.main",
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
            label='Enter City'
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
              alignSelf: "stretch",
              p: 3,
              py: 1,
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
        </FormControl>
      </form>
      {/* end of form */}

      {/* weather container */}
      <Box sx={{ display: "grid", placeContent: "center" }}>
        {/* weather card */}
        <Card
          sx={{
            p: 3,
            textAlign: "center",
            display: "grid",
            gap: "2rem 0",
            border: "2px solid transparent",
            borderRadius: "1rem",
            borderColor: "secondary.main",
            color: "secondary.main",
            bgcolor: "primary.main",
            boxShadow: 0,
            minWidth: "17.5rem",
            minHeight: "19rem",
            position: "relative",
          }}
        >
          {/* loadingBar container */}
          <div
            className={`absolute bg-slate-500 bg-opacity-25 grid place-content-center transition-opacity inset-0 ${
              isLoading ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* loadingBar svg */}
            <img
              className='scale-75'
              src={loadingBar}
              alt='animated loading bar'
            />
          </div>
          {/* city name */}
          <Typography
            variant='h1'
            sx={{
              fontSize: "2.5rem",
              fontWeight: 700,
              textTransform: "capitalize",
            }}
          >
            {userCity.city}
          </Typography>
          {/* city temperature */}
          <Typography
            variant='h2'
            sx={{
              fontSize: "2.2rem",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            {userCity.temp} °C
          </Typography>
          {/* city weather type */}
          <Typography
            variant='h3'
            sx={{
              fontSize: "2.2rem",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            {userCity.weather}
          </Typography>
        </Card>
        {/* end of weather card */}
      </Box>
      {/* end of wheather container */}
    </Box>
  )
}
export default Weathermeteo
