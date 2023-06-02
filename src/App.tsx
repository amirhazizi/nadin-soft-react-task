import { BrowserRouter, Routes, Route } from "react-router-dom" //react-router
import Dashboard from "./components/Dashboard" // dashboard component
import SharedLayout from "./components/SharedLayout" // sharedLayout component
import TodoList from "./components/TododoList" // todoList component
import Weathermeteo from "./components/Weathermeteo" // weather component
import Profile from "./components/Profile" // profile component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='todolist' element={<TodoList />} />
          <Route path='weather' element={<Weathermeteo />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
