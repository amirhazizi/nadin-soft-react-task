import { BrowserRouter, Routes, Route } from "react-router-dom" //react-router
import Dashboard from "./components/Dashboard" // dashboard component
import SharedLayout from "./components/SharedLayout" // sharedLayout component
import TodoList from "./components/TododoList" // todoList component
import Weathermeteo from "./components/Weathermeteo" // weather component
import Profile from "./components/Profile" // profile component

import { createTheme, ThemeProvider } from "@mui/material" //theme MUI modules

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#030303",
    },
  },
}) // light theme
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
  },
}) // dark theme

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='todolist' element={<TodoList />} />
            <Route path='weather' element={<Weathermeteo />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
