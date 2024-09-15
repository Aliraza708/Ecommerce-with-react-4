import { createContext, useState } from "react";


export const Theme = createContext()

function ThemeContextProvider({children}){
     const [theme,setTheme]=useState("Dark")
    return(
        <Theme.Provider value={{theme,setTheme}}>
            {children}
        </Theme.Provider>
    )
}
export default ThemeContextProvider