import { useState, useEffect } from "react" //react hooks

import { Typography, Box } from "@mui/material" //mui

import { useSelector } from "react-redux" //redux state selector
import { RootState } from "../redux/store" // root State type

import { lightTheme } from "../themes" // themes

// greeting changer based on time hour
const greetingChanger = (time: Date) => {
  const hour = time.getHours()
  if (hour < 12) return "Good morning"
  if (hour < 16) return "Good afternoon"
  return "Good evening"
}

const Dashboard = () => {
  const [time, setTime] = useState(new Date()) // time state
  const [greeting, setGreeting] = useState(greetingChanger(time)) // greeting state based on time
  const user = useSelector((state: RootState) => state.storeReducer.user) // user name

  // run after intial render or user re-render
  useEffect(() => {
    // invertal loop run after 1s
    const loop = setInterval(() => {
      const newTime = new Date() // get current time

      setTime(() => {
        // change time state
        return newTime
      })
      setGreeting(() => {
        // change greeting state
        return greetingChanger(newTime)
      })
    }, 1000)
    return () => clearInterval(loop) //cleanup useEffect function
  }, [])
  return (
    <Box
      sx={{
        textAlign: "center",
        display: "grid",
        gap: ".75rem 0",
        color: "secondary.main",
        maxWidth: "25rem",
        mx: "auto",
        pt: "4rem",
        alignSelf: "start",
        [lightTheme.breakpoints.up("md")]: {
          maxWidth: "35rem",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "6rem",
          [lightTheme.breakpoints.up("md")]: {
            fontSize: "8rem",
          },
        }}
        variant='h1'
      >
        {time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}:
        {time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}
      </Typography>
      <Typography
        sx={{
          fontSize: "2rem",
          [lightTheme.breakpoints.up("md")]: {
            fontSize: "2.5rem",
          },
        }}
        variant='h2'
      >
        {greeting}, {user}
      </Typography>
    </Box>
  )
}

export default Dashboard
