import { useContext } from "react"
import { Theme } from "../ContextApi/Theme"

function Chip({ showcategory, isChosen, onclick }) {
  const { setTheme, theme } = useContext(Theme)

  const { name } = showcategory
  return (
    <div className="flex  flex-wrap">

      <span onClick={onclick} className={` 
      cursor-pointer  text-sm font-medium   shadow  px-4  py-2 hover:bg-blue-400 hover:text-white
    ${isChosen ? 'bg-blue-400 text-white' : theme === "Dark" ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} 
   
}`}>{name}</span>


    </div>


  )
}

export default Chip