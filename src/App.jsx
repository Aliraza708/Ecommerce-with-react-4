import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components .jsx/Header'
import Product from './Pages/Product'
import SignUp from './Pages/SingUp'
import SignIn from './Pages/SignIn'
import ProuductDetail from './Pages/ProductDetail'
import Cart from './Pages/ProductCart'
import Footer from './Components .jsx/Footer'

function App() {

  return (
    <BrowserRouter>
      {<Header/>}
    <Routes>
      <Route path='/' element={<Product/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/product/:id' element={<ProuductDetail/>}/>
      <Route path='/SignUp'element={<SignUp/>} />
      <Route path='/SignIn'element={<SignIn/>} />
       
    </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
