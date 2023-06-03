import { Provider } from "react-redux"
import { store } from "../redux/store"
import Profile from "./Profile"

const username = "amir"

describe("<Profile />", () => {
  it("initial render submit btn should disabled", () => {
    cy.mount(
      <Provider store={store}>
        <Profile />
      </Provider>
    )
    cy.get("button[type=submit]").should("be.disabled")
  })
  it("first input value change but submit btn should disabled", () => {
    cy.mount(
      <Provider store={store}>
        <Profile />
      </Provider>
    )
    cy.get("#user-name").type(username)
    cy.get("button[type=submit]").should("be.disabled")
  })
  it("second input value change but submit btn should disabled", () => {
    cy.mount(
      <Provider store={store}>
        <Profile />
      </Provider>
    )
    cy.get("#user-name").type(username)
    cy.get("#theme-select").type("dark{enter}")
    cy.get("button[type=submit]").should("be.disabled")
  })
  it("all input value change and submit form display success notif", () => {
    cy.mount(
      <Provider store={store}>
        <Profile />
      </Provider>
    )
    cy.get("#user-name").type(username)
    cy.get("#theme-select").type("dark{enter}")
    cy.get("#city-select").type("Kermanshah{enter}")
    cy.get("button[type=submit]").click()
    cy.contains("Profile Updated!").should("exist")
    cy.wait(2600)
    cy.contains("Profile Updated!").should("not.exist")
  })
})
