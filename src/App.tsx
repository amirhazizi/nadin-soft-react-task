import { BrowserRouter, Routes, Route } from "react-router-dom" //react-router
import {
  Dashboard,
  SharedLayout,
  TodoList,
  Weathermeteo,
  Profile,
  Error,
} from "./components" // custom components
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
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
