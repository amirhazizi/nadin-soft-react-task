import SharedLayout from "./SharedLayout"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import { BrowserRouter as Router } from "react-router-dom"
describe("<SharedLayout />", () => {
  it("renders", () => {
    cy.mount(
      <Router>
        <Provider store={store}>
          <SharedLayout />
        </Provider>
      </Router>
    )
  })
})
