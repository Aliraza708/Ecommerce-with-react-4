import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SearchContextProvider from './ContextApi/Searchbar .jsx'
import CartContextProvider from './ContextApi/CartIncrement.jsx'
import ThemeContextProvider from './ContextApi/Theme.jsx'
import UserContextprovider from './ContextApi/user.jsx'

createRoot(document.getElementById('root')).render(
  <UserContextprovider>
  <ThemeContextProvider>
  <SearchContextProvider>
    <CartContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </CartContextProvider>
  </SearchContextProvider>
 </ThemeContextProvider>
 </UserContextprovider>
)
