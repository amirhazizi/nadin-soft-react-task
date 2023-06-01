import { Outlet, NavLink } from "react-router-dom"
import { Divider, Container } from "@mui/material"

const SharedLayout = () => {
  return (
    <Container>
      <Divider sx={{ pt: "2rem" }}>
        <Outlet />
      </Divider>
    </Container>
  )
}
export default SharedLayout
