import Weathermeteo from "./Weathermeteo"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import { updateweather } from "../redux/storeSlicer"
describe("initial render and set city from form", () => {
  it("load elements and submit btn disabled", () => {
    cy.mount(
      <Provider store={store}>
        <Weathermeteo />
      </Provider>
    )
    cy.get("button[type=submit]").should("be.disabled")
  })
  it("add city and showed weather of city", () => {
    cy.mount(
      <Provider store={store}>
        <Weathermeteo />
      </Provider>
    )
    cy.get("input").type("Kermanshah")
    cy.get("button[type=submit]").click()
    cy.wait(2500)
    cy.contains("Kermanshah").should("exist")
  })
})
describe("set city from redux", () => {
  it("get city and show it from redux", () => {
    cy.mount(
      <Provider store={store}>
        <Weathermeteo />
      </Provider>
    )
    store.dispatch(
      updateweather({
        city: "Kermanshah",
        temperature: 20,
        code: 2,
        uploadTime: new Date().getTime(),
      })
    )
    cy.get("button[type=submit]").should("be.disabled")
    cy.wait(2500)
    cy.contains("Kermanshah").should("exist")
  })
})
