import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material" //mui
import { lightTheme } from "../themes" // themes

//react icons
import { AiOutlineMenu } from "react-icons/ai"
import { RiMoonClearLine, RiSunFill } from "react-icons/ri"

import { useSelector, useDispatch } from "react-redux" // state selector
import { RootState } from "../redux/store" // state type (typescript required)
import { updateTheme, updateLanguage } from "../redux/storeSlicer" // redux dispatches

import i18next from "i18next" //i18next
import { useTranslation } from "react-i18next" // translation i18n custom hook

type NavParams = {
  setIsSidebar: (a: boolean) => void
}
const Navbar = ({ setIsSidebar }: NavParams) => {
  const { theme, lan } = useSelector((state: RootState) => state.storeReducer) // theme and language state
  const dispatch = useDispatch() //redux distpatch

  const { t } = useTranslation() // t() from i18n
  return (
    <AppBar
      sx={{
        py: 0.5,
        zIndex: 10,
        [lightTheme.breakpoints.up("md")]: {
          px: 0.5,
        },
      }}
    >
      {/* container */}
      <Container>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: lan === "en" ? "row" : "row-reverse",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* menu btn and header container */}
          <Box
            sx={{
              display: "flex",
              gap: "0 1rem",
              flexDirection: lan === "en" ? "row" : "row-reverse",
              justifyContent: "space-between",
            }}
          >
            {/* menu btn */}
            <IconButton
              size='large'
              color='inherit'
              sx={{
                [lightTheme.breakpoints.up("md")]: {
                  display: "none",
                },
              }}
              onClick={() => setIsSidebar(true)}
            >
              <AiOutlineMenu />
            </IconButton>
            {/* appbar header */}
            <Typography
              variant='h1'
              component='div'
              sx={{ fontSize: "1.5rem", fontWeight: 500, alignSelf: "center" }}
            >
              {t("React Test")}
            </Typography>
          </Box>
          {/* end of menu btn and header container */}

          {/* theme and lanswitcher container */}
          <Box sx={{ display: "flex", gap: "0 1rem" }}>
            {/* language switcher */}
            <Button
              sx={{ color: "secondary.main" }}
              onClick={() => {
                if (lan === "fa") {
                  i18next.changeLanguage("en")
                } else {
                  i18next.changeLanguage("fa")
                }
                dispatch(updateLanguage())
              }}
            >
              {lan}
            </Button>
            {/* theme switcher */}
            <IconButton
              size='small'
              onClick={() => {
                const newTheme = theme === "light" ? "dark" : "light"
                dispatch(updateTheme(newTheme))
              }}
            >
              {theme === "light" ? (
                <RiMoonClearLine className='todo-btn fill-black' />
              ) : (
                <RiSunFill className='todo-btn fill-white' />
              )}
            </IconButton>
          </Box>
          {/* end of theme and lanswitcher container */}
        </Toolbar>
      </Container>
      {/* end of container */}
    </AppBar>
  )
}
export default Navbar
