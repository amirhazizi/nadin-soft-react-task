import { List, Box } from "@mui/material" // mui
import { lightTheme } from "../themes" // themes

import { NavLink } from "react-router-dom" // react router

import { useSelector } from "react-redux" //redux selector
import { RootState } from "../redux/store" //redux rootstate type

import { useTranslation } from "react-i18next" // translation i18n custom hook

const FixedSideBar = () => {
  const { lan } = useSelector((state: RootState) => state.storeReducer) // language from redux
  const { t } = useTranslation() // t() from i18n
  const navLinks = [
    { text: t("Dashboard"), link: "/dashboard" },
    { text: t("Todos"), link: "/todolist" },
    { text: t("Weather"), link: "/weather" },
    { text: t("Profile"), link: "/profile" },
  ] //navlinks for navigate
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
      {/* navlinks container */}
      <List
        sx={{
          display: "grid",
          gap: "1.5rem 0",
          p: 5,
          pt: 14,
          textAlign: lan === "fa" ? "right" : "left",
        }}
      >
        {/* map over navLinks */}
        {navLinks.map((singleNav, index) => (
          // single navlink
          <NavLink
            to={singleNav.link}
            key={index}
            className={(
              { isActive, isPending } //style changes of user was that path
            ) =>
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
      {/* end of navlinks container */}
    </Box>
  )
}
export default FixedSideBar
