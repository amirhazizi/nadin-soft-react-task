import { useEffect, useState } from "react"

import { Outlet } from "react-router-dom" // react router

import { useSelector, useDispatch } from "react-redux" // state selector
import { RootState } from "../redux/store" // state type (typescript required)

import { getFromLocalStorage, initialState } from "../redux/storeSlicer"

import UserModal from "./UserModal" // user modal

import { Container } from "@mui/material" // mui container

import { useLocalStorage } from "usehooks-ts" // localstorage custom hook

import {
  ThemeProvider,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material" // mui
import { lightTheme, darkTheme } from "../themes" // themes

import Navbar from "./Navbar"
import Sidebar from "./SIdebar"
import FixedSideBar from "./FIxedSidebar"

const SharedLayout = () => {
  const { user, city, theme, todoList } = useSelector(
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
    saveLocalStorageState({ user, city, theme, todoList })
  }, [user, city, theme, todoList, saveLocalStorageState])

  // set localStorage State on redux
  useEffect(() => {
    dispatch(getFromLocalStorage(localStorageState))
  }, [dispatch, localStorageState])

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Box sx={{ bgcolor: "primary.main", minHeight: "100vh" }}>
        <Container sx={{ pt: 7 }}>
          {!user && <UserModal />}

          <Navbar setIsSidebar={setIsSidebar} />
          <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
          <section>
            <div className='mt-10 md:mt-16 md:flex md:gap-x-20'>
              <FixedSideBar />
              <Outlet />
            </div>
          </section>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
export default SharedLayout
