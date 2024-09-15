import { useContext, useEffect, useState } from "react";
import Card from "../Components .jsx/Card";
import Chip from "../Components .jsx/Chip";
import axios from "axios";
import { SearchContext } from "../ContextApi/Searchbar ";
import { Theme } from "../ContextApi/Theme";

function Product() {
  const [categories,setCategories]=useState([])
  const [showcategories,setShowCategories]=useState([])
  const [Chosencatagores, setChosenCatagores] = useState("All")
  const {search,setLoding} = useContext(SearchContext)
  const { theme } = useContext(Theme);

  useEffect(() => {
    document.body.className = theme === "Dark" ? "light-theme" : "dark-theme";
        return () => {
      document.body.className = "";
    };
  }, [theme]);

    useEffect(() => {
    setLoding(true)
  const url = Chosencatagores ==="All"
   ? `https://dummyjson.com/products/search?q=${search}`
      : `https://dummyjson.com/products/category/${Chosencatagores}`
    axios.get(url).then((res) => setShowCategories(res.data.products))
    .catch((error) => alert(error)) 
     setLoding(false)
  }, [Chosencatagores,search])
  useEffect(()=>{
    setLoding(true)
    fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then((item)=>setCategories(item));
  setLoding(false)
  },[])
    const filter = showcategories.filter((data)=>data.title.toLowerCase().includes(search.toLowerCase())||data.category.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
       <div className="flex flex-wrap gap-2 m-6 ">
                        <Chip onclick={()=>setChosenCatagores("All")} isChosen={Chosencatagores === "All"} showcategory={{
                            name: "All",
                            slug: "All"
                        }} />
                        {categories.map((category, index) => (

                            <Chip key={index} onclick={() => setChosenCatagores(category.slug)} isChosen={Chosencatagores === category.slug} showcategory={category} />
                        ))}
                    </div>
      
      <Card item={filter} />
    </div>

  )

}
export default Product