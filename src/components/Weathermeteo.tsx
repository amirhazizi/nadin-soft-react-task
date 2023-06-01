import { useState, useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../redux/store"

import {
  FormControl,
  TextField,
  Button,
  Box,
  Card,
  Typography,
} from "@mui/material"

import axios from "axios"
import { updateCity } from "../redux/storeSlicer"

import weatherCodeChecker from "../weatherCodeChecker"

const baseGetWeatherURL = "https://api.open-meteo.com/v1"
const baseGetLocationURL = "https://geocoding-api.open-meteo.com/v1/"

const autoGetLocationFetch = axios.create({
  baseURL: baseGetLocationURL,
  headers: { Accept: "application/json" },
})
const autoGetWeatherFetch = axios.create({
  baseURL: baseGetWeatherURL,
  headers: { Accept: "application/json" },
})

const intialCity = { city: "tehran", temp: 14, weather: "windy" }

const Weathermeteo = () => {
  const city = useSelector((state: RootState) => state.storeReducer.city)
  const dispatch = useDispatch()
  const [userCity, setUserCity] = useState(intialCity)
  const [userInput, setUserInput] = useState("")

  const fetchLocation = async (cityProp: string) => {
    try {
      const { data: locData } = await autoGetLocationFetch(
        `/search?name=${cityProp}&count=1`
      )
      const { latitude, longitude } = locData.results[0]
      const { data: weatherData } = await autoGetWeatherFetch(
        `/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      )

      setUserCity({
        city: cityProp,
        temp: weatherData.current_weather.temperature,
        weather: weatherCodeChecker(weatherData.current_weather.weathercode),
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchLocation(city)
  }, [city])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput) return
    dispatch(updateCity(userInput))
    setUserInput("")
  }
  return (
    <Box sx={{ display: "grid", gap: "4rem 0" }}>
      <form onSubmit={handleSubmit}>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "0 1.5rem",
          }}
        >
          <TextField
            value={userInput}
            sx={{ width: "75%" }}
            onChange={(e) => setUserInput(e.target.value)}
            variant='standard'
            label='Enter City'
            color='info'
          />
          <Button
            sx={{
              color: "green",
              alignSelf: "end",
              p: 3,
              py: 1,
              ":hover": {
                bgcolor: "green",
                color: "primary.main",
              },
            }}
            type='submit'
          >
            Submit
          </Button>
        </FormControl>
      </form>
      <Box sx={{ display: "grid", placeContent: "center" }}>
        <Card
          sx={{
            p: 3,
            textAlign: "center",
            display: "grid",
            gap: "2rem 0",
            border: "2px solid transparent",
            borderColor: "secondary.main",
            boxShadow: 0,
            minWidth: "20rem",
          }}
        >
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
          <Typography
            variant='h1'
            sx={{
              fontSize: "2.2rem",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            {userCity.temp} °C
          </Typography>
          <Typography
            variant='h1'
            sx={{
              fontSize: "2.2rem",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            {userCity.weather}
          </Typography>
        </Card>
      </Box>
    </Box>
  )
}
export default Weathermeteo
