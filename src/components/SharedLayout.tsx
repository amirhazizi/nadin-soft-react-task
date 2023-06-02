import { useEffect } from "react"

import { Outlet, NavLink } from "react-router-dom" // react router

import { useSelector, useDispatch } from "react-redux" // state selector
import { RootState } from "../redux/store" // state type (typescript required)
import { getFromLocalStorage, initialState } from "../redux/storeSlicer"

import UserModal from "./UserModal" // user modal

import { Container } from "@mui/material" // mui container

import { useLocalStorage } from "usehooks-ts" // localstorage custom hook

const SharedLayout = () => {
  const { user, city, theme, todoList } = useSelector(
    (state: RootState) => state.storeReducer
  ) // user state
  const dispatch = useDispatch() //redux distpatch
  const [localStorageState, saveLocalStorageState] = useLocalStorage(
    "nadin-soft-react-test",
    initialState
  ) // local Storage

  //update localStorages
  useEffect(() => {
    saveLocalStorageState({ user, city, theme, todoList })
  }, [user, city, theme, todoList, saveLocalStorageState])

  // set localStorage State on redux
  useEffect(() => {
    dispatch(getFromLocalStorage(localStorageState))
  }, [dispatch, localStorageState])

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
