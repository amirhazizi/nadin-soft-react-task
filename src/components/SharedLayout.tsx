import { Outlet, NavLink } from "react-router-dom"

const SharedLayout = () => {
  return (
    <p>
      <Outlet />
    </p>
  )
}
export default SharedLayout
