import { useEffect } from "react"

import { Outlet, NavLink } from "react-router-dom" // react router

import { useSelector, useDispatch } from "react-redux" // state selector
import { RootState } from "../redux/store" // state type (typescript required)
import { getFromLocalStorage, initialState } from "../redux/storeSlicer"

import UserModal from "./UserModal" // user modal

import { Container } from "@mui/material" // mui container

import { useLocalStorage } from "usehooks-ts" // localstorage custom hook
import { createTheme, ThemeProvider } from "@mui/material" //theme MUI modules

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      light: "#717171",
    },
    secondary: {
      main: "#030303",
    },
  },
}) // light theme
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#212121",
      light: "#949494",
    },
    secondary: {
      main: "#ffffff",
    },
  },
}) // dark theme

const SharedLayout = () => {
  const { user, city, theme, todoList } = useSelector(
    (state: RootState) => state.storeReducer
  ) // user state
  const dispatch = useDispatch() //redux distpatch
  const [localStorageState, saveLocalStorageState] = useLocalStorage(
    "nadin-soft-react-test",
    initialState
  ) // local Storage

  //update localStoragess
  useEffect(() => {
    saveLocalStorageState({ user, city, theme, todoList })
  }, [user, city, theme, todoList, saveLocalStorageState])

  // set localStorage State on redux
  useEffect(() => {
    dispatch(getFromLocalStorage(localStorageState))
  }, [dispatch, localStorageState])

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Container sx={{ bgcolor: "primary.main", minHeight: "100vh", pt: 7 }}>
        {!user && <UserModal />}
        <section>
          <Outlet />
        </section>
      </Container>
    </ThemeProvider>
  )
}
export default SharedLayout
