import { Drawer, List, IconButton, Divider, Box } from "@mui/material" // mui
import { NavLink } from "react-router-dom" // react router
import { GrFormClose } from "react-icons/gr"
import { useTranslation } from "react-i18next"

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

type SidebarParams = {
  setIsSidebar: (a: boolean) => void
  isSidebar: boolean
}

const Sidebar = ({ setIsSidebar, isSidebar }: SidebarParams) => {
  const { lan } = useSelector((state: RootState) => state.storeReducer)
  const { t } = useTranslation()
  const navLinks = [
    { text: t("Dashboard"), link: "/dashboard" },
    { text: t("Todos"), link: "/todolist" },
    { text: t("Weather"), link: "/weather" },
    { text: t("Profile"), link: "/profile" },
  ]
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
      anchor={lan === "en" ? "left" : "right"}
      open={isSidebar}
    >
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
      <Divider />
      <List
        sx={{
          display: "grid",
          gap: "1rem",
          p: 3,
          textAlign: lan === "fa" ? "right" : "left",
        }}
      >
        {navLinks.map((singleNav, index) => (
          <NavLink
            onClick={() => setIsSidebar(false)}
            to={singleNav.link}
            key={index}
            className={({ isActive, isPending }) =>
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
    </Drawer>
  )
}
export default Sidebar
