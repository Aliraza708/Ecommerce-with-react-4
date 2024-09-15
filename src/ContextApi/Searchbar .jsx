import {createContext,  useState } from "react";

export const SearchContext = createContext()


function SearchContextProvider({ children }) {
    const [Loding, setLoding] = useState(false)
    const [search, setsearch] = useState("")

    return (
        <SearchContext.Provider value={{ search, setsearch,setLoding ,Loding}} >
           {Loding ? <div className="flex justify-center items-center h-screen"><Spin size="large" /></div> : children}
        </SearchContext.Provider>
    )
}
export default SearchContextProvider