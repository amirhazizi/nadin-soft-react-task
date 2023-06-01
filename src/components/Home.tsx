import { Typography, Box } from "@mui/material" //mui
import { useState, useEffect } from "react" //react hooks

// greeting changer based on time hour
const greetingChanger = (time: Date) => {
  const hour = time.getHours()
  if (hour < 12) return "Good morning"
  if (hour < 16) return "Good afternoon"
  return "Good evening"
}

const user = "Amir Hosssein" // redux user name

const Home = () => {
  const [time, setTime] = useState(new Date()) // time state
  const [greeting, setGreeting] = useState(greetingChanger(time)) // greeting state based on time

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
    <Box sx={{ textAlign: "center", display: "grid", gap: ".75rem 0" }}>
      <Typography variant='h1'>
        {time.getHours()}:{time.getMinutes()}
      </Typography>
      <Typography>
        {greeting}, {user}
      </Typography>
    </Box>
  )
}

export default Home
