import './App.css'
import Landing_page from "./Pages/Landing_page.jsx"
import "./Pages/Landing_page.css"
import Login from "./Pages/Login.jsx"
import "./Pages/Login_Signup.css"
import Dashboard from "./Pages/Dashboard.jsx"
import SignUp from './Pages/Signup.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() { 

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing_page/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
