import { useEffect, useState } from "react"

import { Outlet } from "react-router-dom" // react router

import { useSelector, useDispatch } from "react-redux" // state selector
import { RootState } from "../redux/store" // state type (typescript required)

import { getFromLocalStorage, initialState } from "../redux/storeSlicer"

import UserModal from "./UserModal" // user modal

import { Container } from "@mui/material" // mui container

import { useLocalStorage } from "usehooks-ts" // localstorage custom hook

import { ThemeProvider, Box } from "@mui/material" // mui
import { lightTheme, darkTheme } from "../themes" // themes

import Navbar from "./Navbar"
import Sidebar from "./SIdebar"
import FixedSideBar from "./FIxedSidebar"

const SharedLayout = () => {
  const { user, city, theme, todoList, weather } = useSelector(
    (state: RootState) => state.storeReducer
  ) // user state
  const dispatch = useDispatch() //redux distpatch
  const [localStorageState, saveLocalStorageState] = useLocalStorage(
    "nadin-soft-react-test",
    initialState
  ) // local Storage

  const [isSidebar, setIsSidebar] = useState(false)

  //update localStoragess
  useEffect(() => {
    saveLocalStorageState({ user, city, theme, todoList, weather })
  }, [user, city, theme, todoList, weather, saveLocalStorageState])

  // set localStorage State on redux
  useEffect(() => {
    dispatch(getFromLocalStorage(localStorageState))
  }, [dispatch, getFromLocalStorage])

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Box sx={{ bgcolor: "primary.main" }}>
        <Container sx={{ mx: "auto" }}>
          <Box>
            {!user && <UserModal />}

            <Navbar setIsSidebar={setIsSidebar} />
            <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
            <section>
              <div className=' pt-10 md:pt-16 md:flex md:gap-x-10 min-h-screen w-full'>
                <FixedSideBar />
                <Outlet />
              </div>
            </section>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
export default SharedLayout
