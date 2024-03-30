import Home from "./pages/Home";
import ModeToggle from "./components/Modetoggle"
import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom";


function App() {
  return (
 
    <Routes>
      <Route path="/" element={<Home/>}/>     
    </Routes>
  )
}

export default App
