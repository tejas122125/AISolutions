import Home from "./pages/Home";
import ModeToggle from "./components/Modetoggle"
import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom";


function App() {
  return (
   <div className="w-screen h-screen bg-blue-700 flex flex-col">
    <Routes>
      <Route path="/" element={<Home/>}/>
      
    </Routes>
  
  
   </div>
  )
}

export default App
