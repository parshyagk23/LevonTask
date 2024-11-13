
import { Routes,Route } from "react-router-dom"
import Register from "./Components/Register"
import Login from "./Components/Login"
import Calculator from "./Components/Calculator"
import { useState } from "react"
import ProtectedRoute from "./ProtectRoute"
function App() {
  
  const [Options, setOptions] = useState("")
  return (
   <>
   <Routes>
    <Route path="/" element={<Register  />}/>
    <Route path="/login" element={<Login Options={Options} setOptions={setOptions} />}/>
    <Route path="/calculator" element={<ProtectedRoute Component={Calculator} />}/>
   </Routes>
   </>
  )
}

export default App
