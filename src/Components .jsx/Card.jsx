import { Link,  } from "react-router-dom"
import { Theme } from "../ContextApi/Theme"
import { useContext } from "react"

function Card({ item, check }) {
    const { setTheme, theme } = useContext(Theme)

    return (
        <div className="flex justify-between gap-3 flex-wrap m-4">
            {item.map((data, index) => {
                const { thumbnail, title, rating, price, id, description, category } = data

                return (<Link to={`/product/${id}`} key={index} onClick={check} className={`w-80 h-auto bg-white border border-gray-200 rounded-lg shadow ${theme == "Dark" ? "dark:bg-gray-800 dark:border-gray-700 dark:text-white" : "dark:bg-white dark:border-white dark:text-gray-600"}  `}>

                    <img className="h-52 ml-10 rounded-t-lg" src={thumbnail} alt="" />

                    <div className="p-5">

                        <h5 className="mb-2 font-bold tracking-tight  ">
                            {title}
                        </h5>

                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {description}
                        </p>
                           <p >
                            ${price}
                           </p>
                        </div>

                </Link>
                )

            })}
        </div>

    )
}
export default Card