import { List, Box } from "@mui/material" // mui
import { NavLink } from "react-router-dom" // react router

import { lightTheme } from "../themes" // themes
import { useSelector } from "react-redux"

import { useTranslation } from "react-i18next"
import { RootState } from "../redux/store"

const FixedSideBar = () => {
  const { t } = useTranslation()
  const { lan } = useSelector((state: RootState) => state.storeReducer)
  const navLinks = [
    { text: t("Dashboard"), link: "/dashboard" },
    { text: t("Todos"), link: "/todolist" },
    { text: t("Weather"), link: "/weather" },
    { text: t("Profile"), link: "/profile" },
  ]
  return (
    <Box
      sx={{
        width: "32%",
        borderRight: lan === "en" ? "2px solid transparent" : "none",
        borderLeft: lan === "fa" ? "2px solid transparent" : "none",
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
          textAlign: lan === "fa" ? "right" : "left",
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
                ? "text-blue-700 text-xl font-medium "
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
