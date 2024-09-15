import React, { createContext, useState, useEffect } from "react";

// Create the CartContext
export const CartContext = createContext();
function CartContextProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cartCount");
        return savedCart ? JSON.parse(savedCart) : 0;
    });

    // Update localStorage whenever the cart count changes
    useEffect(() => {
        localStorage.setItem("cartCount", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
}
export default CartContextProvider