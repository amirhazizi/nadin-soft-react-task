import { BrowserRouter, Routes, Route } from "react-router-dom" //react-router
import Dashboard from "./components/Dashboard" //Dashboard component
import SharedLayout from "./components/SharedLayout" //SharedLayout component

import TodoList from "./components/TododoList" // TodoList component
import Weathermeteo from "./components/Weathermeteo" // weather component

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
            <Route path='Weather' element={<Weathermeteo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
