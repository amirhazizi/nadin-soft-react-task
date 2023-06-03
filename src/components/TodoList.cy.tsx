import TodoList from "./TodoList"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import {
  addNewTodo,
  finishEditTodo,
  removeTodo,
  startEditTodo,
  resetTodos,
} from "../redux/storeSlicer"

describe("todoList state with event handlers", () => {
  const formTodo = "new Todo from form input"
  const updatedContent = "eyy i got updated..."
  it("load properly and submit btn should disabled", () => {
    cy.mount(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
    cy.get('button[type="submit"]').should("be.disabled")
  })
  it("add new todo", () => {
    cy.mount(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
    cy.get("input").type(formTodo)
    cy.get('button[type="submit"]').click()
    cy.get("input").should("be.empty")
    cy.get('button[type="submit"]').should("be.disabled")
  })

  it("edit todo", () => {
    cy.mount(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
    cy.contains(formTodo).get(".edit-btn").first().click()
    cy.get("input").should("have.value", formTodo)
    cy.get("input").clear()
    cy.get("input").type(updatedContent)
    cy.wait(500)
    cy.get('button[type="submit"]').click()
    cy.get("input").should("be.empty")
    cy.get('button[type="submit"]').should("be.disabled")
    cy.contains(updatedContent)
  })
  it("remove old todo", () => {
    cy.mount(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
    cy.wait(750)
    cy.contains(updatedContent).get(".delete-btn").first().click()
    cy.contains(updatedContent).should("not.exist")
  })
  it("remove all todos", () => {
    cy.mount(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
    cy.get("input").type(`${formTodo} 1`)
    cy.get('button[type="submit"]').click()
    cy.get("input").should("be.empty")
    cy.get('button[type="submit"]').should("be.disabled")

    cy.get("input").type(`${formTodo} 2`)
    cy.get('button[type="submit"]').click()
    cy.get("input").should("be.empty")
    cy.get('button[type="submit"]').should("be.disabled")

    cy.get("#reset-btn").click()
    cy.contains(`${formTodo} 1`).should("not.exist")
    cy.contains(`${formTodo} 2`).should("not.exist")
  })
})

describe("todoList state with redux dispatches", () => {
  const todoContent = "new todo by cypress i will delete"
  const updateTodoContent = "i updated with dispatch"
  const time = new Date().getTime()

  it("load properly and submit btn should disabled", () => {
    cy.mount(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
    cy.get('button[type="submit"]').should("be.disabled")
  })
  it("add new todo", () => {
    cy.mount(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
    store.dispatch(addNewTodo({ content: todoContent, id: time }))
    cy.contains(todoContent)
    cy.get("input").should("be.empty")
    cy.get('button[type="submit"]').should("be.disabled")
  })
  it("edit old todo", () => {
    cy.mount(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
    store.dispatch(startEditTodo({ content: todoContent, id: time }))
    store.dispatch(finishEditTodo(updateTodoContent))
    cy.contains(updateTodoContent)
    cy.get("input").should("be.empty")
    cy.get('button[type="submit"]').should("be.disabled")
  })
  it("remove todo", () => {
    cy.mount(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
    store.dispatch(removeTodo(time))
    cy.contains(updateTodoContent).should("not.exist")
    cy.get("input").should("be.empty")
    cy.get('button[type="submit"]').should("be.disabled")
  })
  it("remove all todos", () => {
    cy.mount(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
    store.dispatch(addNewTodo({ content: `${todoContent} 1`, id: time + 50 }))
    store.dispatch(addNewTodo({ content: `${todoContent} 2`, id: time + 100 }))
    store.dispatch(resetTodos())
    cy.contains(`${todoContent} 1`).should("not.exist")
    cy.contains(`${todoContent} 2`).should("not.exist")
  })
})
