import { Drawer, List, Box } from "@mui/material" // mui
import { NavLink } from "react-router-dom" // react router

import { lightTheme } from "../themes" // themes

const navLinks = [
  { text: "Dashboard", link: "/dashboard" },
  { text: "Todos", link: "/todolist" },
  { text: "Weather", link: "/weather" },
  { text: "Profile", link: "/profile" },
]
const FixedSideBar = () => {
  return (
    <Box
      sx={{
        width: "30%",
        borderRight: "2px solid transparent",
        bgcolor: "primary.main",
        alignSelf: "stretch",
        color: "secondary.main",
        borderColor: "secondary.main",
        [lightTheme.breakpoints.down("md")]: {
          display: "none",
        },
      }}
    >
      <List
        sx={{
          display: "grid",
          gap: "1.5rem 0",
          p: 5,
          pt: 14,
        }}
      >
        {navLinks.map((singleNav, index) => (
          <NavLink
            to={singleNav.link}
            key={index}
            className={({ isActive, isPending }) =>
              isPending
                ? "text-red-700"
                : isActive
                ? "text-blue-700 text-xl font-medium relative after:w-24 after:h-px after:absolute after:-bottom-1 after:left-0 after:bg-blue-700"
                : "text-xl font-medium "
            }
          >
            {singleNav.text}
          </NavLink>
        ))}
      </List>
    </Box>
  )
}
export default FixedSideBar
