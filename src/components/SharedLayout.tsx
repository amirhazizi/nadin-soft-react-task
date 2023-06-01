import { Outlet, NavLink } from "react-router-dom"

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

import UserModal from "./UserModal"

import { Divider, Container } from "@mui/material"

const SharedLayout = () => {
  return (
    <Container>
      <UserModal />
      <Divider sx={{ pt: "2rem" }}>
        <Outlet />
      </Divider>
    </Container>
  )
}
export default SharedLayout
