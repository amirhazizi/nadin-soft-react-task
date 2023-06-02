import { Drawer, List, IconButton, Divider, Box } from "@mui/material" // mui
import { NavLink } from "react-router-dom" // react router
import { GrFormClose } from "react-icons/gr"
const navLinks = [
  { text: "Dashboard", link: "/dashboard" },
  { text: "Todos", link: "/todolist" },
  { text: "Weather", link: "/weather" },
  { text: "Profile", link: "/profile" },
]

type SidebarParams = {
  setIsSidebar: (a: boolean) => void
  isSidebar: boolean
}

const Sidebar = ({ setIsSidebar, isSidebar }: SidebarParams) => {
  return (
    <Drawer
      sx={{
        display: "grid",
        gap: "1rem 0",
        "& .MuiDrawer-paper": {
          width: "45%",
          boxSizing: "border-box",
        },
      }}
      variant='persistent'
      anchor='left'
      open={isSidebar}
    >
      <Box
        sx={{
          p: 1,
          width: "fit-content",
          ml: "auto",
        }}
      >
        <IconButton onClick={() => setIsSidebar(false)}>
          <GrFormClose className='todo-btn' />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ display: "grid", gap: "1rem", p: 3 }}>
        {navLinks.map((singleNav, index) => (
          <NavLink
            onClick={() => setIsSidebar(false)}
            to={singleNav.link}
            key={index}
            className={({ isActive, isPending }) =>
              isPending
                ? "text-red-700"
                : isActive
                ? "text-blue-700 text-lg font-medium relative after:w-24 after:h-px after:absolute after:-bottom-1 after:left-0 after:bg-blue-700"
                : "text-lg font-medium "
            }
          >
            {singleNav.text}
          </NavLink>
        ))}
      </List>
    </Drawer>
  )
}
export default Sidebar
