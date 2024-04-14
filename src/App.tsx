import Home from "./pages/Home";
import ModeToggle from "./components/Modetoggle"
import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom";
import GenerativeAI from "./pages/GenerativeAI";
import Text from "./pages/Text";
import Chatwithpdf from "./pages/Chatwithpdf"
import Chatwithcsv from "./pages/Chatwithcsv";



function App() {
  return (
 
    <Routes>
      <Route path="/" element={<Home/>}/>   
      <Route path="/GenerativeAI" element={<GenerativeAI/>}/>   
      <Route path="/Text" element={<Text/>}/>   
      <Route path="/chatwithhpdf" element={<Chatwithpdf/>}/>   
      <Route path="/chatwithcsv" element={<Chatwithcsv/>}/>   




    </Routes>
  )
}

export default App
