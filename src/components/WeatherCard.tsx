import loadingBar from "../assests/Eclipse-loading.svg?url" // svg animate loading bar
import { Card, Typography } from "@mui/material" //mui

import weatherCodeChecker from "../weatherCodeChecker" //weather code to weather type f()

type WeatherCardParams = {
  city: string
  temperature: number
  code: number
  isLoading: boolean
}
import { useTranslation } from "react-i18next"

export default function WeatherCard({
  city,
  temperature,
  code,
  isLoading,
}: WeatherCardParams) {
  const { t } = useTranslation()
  return (
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
        <img className='scale-75' src={loadingBar} alt='animated loading bar' />
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
        {t(city)}
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
        {temperature} °C
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
        {t(weatherCodeChecker(code))}
      </Typography>
    </Card>
  )
}
