import SharedLayout from "./SharedLayout"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import { BrowserRouter as Router } from "react-router-dom"
describe("<SharedLayout />", () => {
  it("inital render should show user form modal", () => {
    cy.mount(
      <Router>
        <Provider store={store}>
          <SharedLayout />
        </Provider>
      </Router>
    )
    cy.get("#user-modal").should("exist")
    cy.get("#user-modal button[type=submit]").should("be.disabled")
  })
  it("submit name unshow modal", () => {
    cy.mount(
      <Router>
        <Provider store={store}>
          <SharedLayout />
        </Provider>
      </Router>
    )
    cy.get("#user-modal input").type("Amir")
    cy.get("#user-modal button[type=submit]").click()
    cy.get("#user-modal").should("not.exist")
  })
  it("menu appbar button show sidebar", () => {
    cy.mount(
      <Router>
        <Provider store={store}>
          <SharedLayout />
        </Provider>
      </Router>
    )
    cy.get("#sidebar").should("not.be.visible")
    cy.get("#user-modal input").type("Amir")
    cy.get("#user-modal button[type=submit]").click()
    cy.get("#menu-btn").click()
    // cy.get("#sidebar").should("be.visible")
  })
  it("close button unshow sidebar", () => {
    cy.mount(
      <Router>
        <Provider store={store}>
          <SharedLayout />
        </Provider>
      </Router>
    )
    cy.get("#user-modal input").type("Amir")
    cy.get("#user-modal button[type=submit]").click()
    cy.get("#menu-btn").click()
    cy.get("#close-btn").click()
    cy.get("#sidebar").should("not.be.visible")
  })
})
