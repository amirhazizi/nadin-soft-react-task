import Dashboard from "./Dashboard"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import { updateUser } from "../redux/storeSlicer"

describe("dashboard", () => {
  it("display currect clock", () => {
    // setUser is an action exported from the user slice
    const hours = new Date().getHours()
    const minutes = new Date().getMinutes()
    const currentClock = `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`
    cy.mount(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    )
    cy.get("#clock").should("have.text", currentClock)
  })
  it("display currect greeting to user(with redux user state)", () => {
    const userName = "Amir hossein"
    const greetingText = greetingChanger(new Date())

    store.dispatch(updateUser(userName))
    cy.mount(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    )
    cy.get("#greeting").should("have.text", `${greetingText}, ${userName}`)
  })
})

const greetingChanger = (time: Date) => {
  const hour = time.getHours()
  if (hour < 12) return "Good morning"
  if (hour < 16) return "Good afternoon"
  return "Good evening"
}
