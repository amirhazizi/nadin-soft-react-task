import { Drawer, List, IconButton, Divider, Box } from "@mui/material" // mui

import { NavLink } from "react-router-dom" // react router

import { GrFormClose } from "react-icons/gr" // react icons

import { useSelector } from "react-redux" //redux selector
import { RootState } from "../redux/store" //redux rootstate type

import { useTranslation } from "react-i18next" // translation i18n custom hook
type SidebarParams = {
  setIsSidebar: (a: boolean) => void
  isSidebar: boolean
} // sidebar params type

const Sidebar = ({ setIsSidebar, isSidebar }: SidebarParams) => {
  const { lan } = useSelector((state: RootState) => state.storeReducer) // language from redux
  const { t } = useTranslation() // t() from i18n
  const navLinks = [
    { text: t("Dashboard"), link: "/dashboard" },
    { text: t("Todos"), link: "/todolist" },
    { text: t("Weather"), link: "/weather" },
    { text: t("Profile"), link: "/profile" },
  ] //navlinks for navigate
  return (
    <Drawer
      sx={{
        display: "grid",
        gap: "1rem 0",
        "& .MuiDrawer-paper": {
          width: "45%",
          boxSizing: "border-box",
          // bgcolor: "secondary.main",
        },
      }}
      variant='persistent'
      anchor={lan === "en" ? "left" : "right"} // based on lan onchor changes
      open={isSidebar}
    >
      {/* close btn container */}
      <Box
        sx={{
          p: 1,
          width: "fit-content",
          margin: lan === "fa" ? "0 auto 0 0" : "0 0 0 auto",
        }}
      >
        <IconButton onClick={() => setIsSidebar(false)}>
          <GrFormClose className='todo-btn' />
        </IconButton>
      </Box>
      {/* end of close btn container */}
      <Divider />
      {/* navlinks container */}
      <List
        sx={{
          display: "grid",
          gap: "1rem",
          p: 3,
          textAlign: lan === "fa" ? "right" : "left",
        }}
      >
        {/* map over navlinks */}
        {navLinks.map((singleNav, index) => (
          // single navlink
          <NavLink
            onClick={() => setIsSidebar(false)}
            to={singleNav.link}
            key={index}
            className={(
              { isActive, isPending } //style changes of user was that path
            ) =>
              isPending
                ? "text-red-700"
                : isActive
                ? "text-blue-700 text-lg font-medium "
                : "text-lg font-medium "
            }
          >
            {t(singleNav.text)}
          </NavLink>
        ))}
      </List>
      {/* end of navlinks container */}
    </Drawer>
  )
}
export default Sidebar
