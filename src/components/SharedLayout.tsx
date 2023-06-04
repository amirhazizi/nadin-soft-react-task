import { useEffect, useState } from "react" // react hooks

import { Outlet } from "react-router-dom" // react router

import { useSelector, useDispatch } from "react-redux" // state selector
import { RootState } from "../redux/store" // state type (typescript required)
import { getFromLocalStorage, initialState } from "../redux/storeSlicer" // redux reducer

import { useLocalStorage } from "usehooks-ts" // localstorage custom hook

import { ThemeProvider, Container } from "@mui/material" // mui components
import { lightTheme, darkTheme } from "../themes" // themes

import UserModal from "./UserModal" // user modal
import Navbar from "./Navbar" // Nav
import Sidebar from "./Sidebar" // Sidebar
import FixedSideBar from "./FIxedSidebar" // fixed Sidebar

// import I18nInit from "../i18n.init" // i18n init f()

const SharedLayout = () => {
  const { user, city, theme, todoList, weather, lan } = useSelector(
    (state: RootState) => state.storeReducer
  ) // user state
  const dispatch = useDispatch() //redux distpatch
  const [isSidebar, setIsSidebar] = useState(false) // sidebar toggle
  const [localStorageState, saveLocalStorageState] = useLocalStorage(
    "nadin-soft-react-test",
    initialState
  ) // local Storage custom hook

  // I18nInit(lan) // i18n init with language redux

  useEffect(() => {
    saveLocalStorageState({ user, city, theme, todoList, weather, lan })
  }, [user, city, theme, todoList, weather, lan, saveLocalStorageState]) //update localStoragess

  // set localStorage State on redux
  useEffect(() => {
    dispatch(getFromLocalStorage(localStorageState))
  }, [dispatch]) // get from localStorage

  return (
    // mui themeProvider
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {/* main */}
      <main className={`${theme === "light" ? "bg-clLightBG" : "bg-clDarkBG"}`}>
        {/* container */}
        <Container sx={{ mx: "auto" }}>
          {/* user modal if user state undefined */}
          {!user && <UserModal />}
          {/* appbar */}
          <Navbar setIsSidebar={setIsSidebar} />
          {/* sidebar */}
          <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
          {/* section */}
          <section
            className={`pt-10 md:pt-16 md:flex md:gap-x-10 min-h-screen w-full ${
              lan === "fa" ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            {/* fixed sidebar */}
            <FixedSideBar />
            {/* other components */}
            <Outlet />
          </section>
          {/* end of section */}
        </Container>
        {/* end of container */}
      </main>
      {/* end of main */}
    </ThemeProvider>
    // end of mui themeProvider
  )
}
export default SharedLayout
