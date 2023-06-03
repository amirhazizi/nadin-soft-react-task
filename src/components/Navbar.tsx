import { useState } from "react" // react

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material" //mui

import { AiOutlineMenu } from "react-icons/ai"
import { RiMoonClearLine, RiSunFill } from "react-icons/ri"

import { useSelector, useDispatch } from "react-redux" // state selector
import { RootState } from "../redux/store" // state type (typescript required)
import { updateTheme, updateLanguage } from "../redux/storeSlicer" // redux dispatch

import { lightTheme } from "../themes" // themes

import i18next from "i18next"

import { useTranslation } from "react-i18next"

type NavParams = {
  setIsSidebar: (a: boolean) => void
}
const Navbar = ({ setIsSidebar }: NavParams) => {
  const { theme, lan } = useSelector((state: RootState) => state.storeReducer) // user state

  const { t } = useTranslation()
  const navbarText = t("React Test")
  const dispatch = useDispatch() //redux distpatch
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
      <Container>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: lan === "en" ? "row" : "row-reverse",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "0 1rem",
              flexDirection: lan === "en" ? "row" : "row-reverse",
              justifyContent: "space-between",
            }}
          >
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
            <Typography
              variant='h1'
              component='div'
              sx={{ fontSize: "1.5rem", fontWeight: 500, alignSelf: "center" }}
            >
              {navbarText}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "0 1rem" }}>
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
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
