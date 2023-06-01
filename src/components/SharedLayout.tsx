import { Outlet, NavLink } from "react-router-dom" // react router

import { useSelector } from "react-redux" // state selector

import UserModal from "./UserModal" // user modal

import { Container } from "@mui/material" // mui container
import { RootState } from "../redux/store" // state type (typescript required)

const SharedLayout = () => {
  const user = useSelector((state: RootState) => state.storeReducer.user) // user state
  return (
    <Container>
      {!user && <UserModal />}
      <section className='mt-20'>
        <Outlet />
      </section>
    </Container>
  )
}
export default SharedLayout
