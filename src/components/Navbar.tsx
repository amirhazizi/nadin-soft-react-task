import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material" //mui
import { AiOutlineMenu } from "react-icons/ai"
import { RiMoonClearLine, RiSunFill } from "react-icons/ri"
import { useSelector, useDispatch } from "react-redux" // state selector
import { RootState } from "../redux/store" // state type (typescript required)
import { updateTheme } from "../redux/storeSlicer"

type NavParams = {
  setIsSidebar: (a: boolean) => void
}
const Navbar = ({ setIsSidebar }: NavParams) => {
  const { theme } = useSelector((state: RootState) => state.storeReducer) // user state
  const dispatch = useDispatch() //redux distpatch
  return (
    <AppBar sx={{ py: 0.5 }}>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
          onClick={() => setIsSidebar(true)}
        >
          <AiOutlineMenu />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          React Test
        </Typography>
        <Button
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
        </Button>
      </Toolbar>
    </AppBar>
  )
}
export default Navbar
