import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

import { useEffect, useState } from "react"

const  ModeToggle = ()=> {
    const [theme,setTheme] = useState("Dark")

    const toggleTheme = ()=>{
        if ( theme != "dark"){
        setTheme("dark")

        }
        else
        {
            setTheme("light")
        }
    }
useEffect (()=> {

const root = document.getElementById("root")
if (root?.classList.contains("dark")){
    if(theme === "dark"){
        root.classList.remove("dark")
    }
}else{
    if (theme === "light"){
        root?.classList.add("dark")
    }
}


},[theme])
  return (
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme == "dark" && <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />}
          {theme == "light" &&  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
        
  )
}
export default ModeToggle
