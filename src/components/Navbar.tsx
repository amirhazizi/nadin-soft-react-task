import { AppBar, Toolbar, IconButton, Typography } from "@mui/material" //mui
import { AiOutlineMenu } from "react-icons/ai"
import { RiMoonClearLine, RiSunFill } from "react-icons/ri"
import { useSelector, useDispatch } from "react-redux" // state selector
import { RootState } from "../redux/store" // state type (typescript required)
import { updateTheme } from "../redux/storeSlicer" // redux dispatch

import { lightTheme } from "../themes" // themes

type NavParams = {
  setIsSidebar: (a: boolean) => void
}
const Navbar = ({ setIsSidebar }: NavParams) => {
  const { theme } = useSelector((state: RootState) => state.storeReducer) // user state
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
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{
            mr: 2,
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
          sx={{ fontSize: "1.5rem", fontWeight: 500, flexGrow: 1 }}
        >
          React Test
        </Typography>
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
      </Toolbar>
    </AppBar>
  )
}
export default Navbar
