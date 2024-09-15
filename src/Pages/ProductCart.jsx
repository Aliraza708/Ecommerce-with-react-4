import {useEffect, useState } from "react";
import { Button, Image } from "antd";
import { PlusOutlined, MinusOutlined, ShoppingCartOutlined } from "@ant-design/icons";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);   
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCartItems);

        const initialTotal = storedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(initialTotal);
    }, []);

    const updateCartItemQuantity = (id, action) => {
        const updatedCart = cartItems.map((item) => {
            if (item.id === id) {
                if (action === "increment") {
                    return { ...item, quantity: item.quantity + 1 };
                } else if (action === "decrement" && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
            }
            return item;
        });

        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        const updatedTotal = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(updatedTotal);
    };

    const handleBuyNow = () => {
        alert("Proceeding to buy the items.");
    };

    return (
        <div className="max-w-4xl mx-auto mt-5 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="mt-3 text-gray-600">Your cart is empty.</p>
            ) : (
                <div>
                    
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div>
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow"
                            >
                                <Image
                                    src={item.thumbnail}
                                    alt={item.title}
                                    width={80}
                                    height={80}
                                    className="rounded-lg"
                                />
                                <div className="flex-1 ml-4">
                                    <h2 className="text-lg font-bold">{item.title}</h2>
                                    <p className="text-gray-600">${item.price}</p>
                                    <div className="flex items-center mt-2">
                                        <Button
                                            icon={<MinusOutlined />}
                                            onClick={() => updateCartItemQuantity(item.id, "decrement")}
                                            className="mr-3"
                                        />
                                        <span>{item.quantity}</span>
                                        <Button
                                            icon={<PlusOutlined />}
                                            onClick={() => updateCartItemQuantity(item.id, "increment")}
                                            className="ml-3"
                                        />
                                    </div>
                                </div>
                                
                                <p className="font-semibold  text-gray-800">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              
                            </div>
                         {/* <Button onClick={()=>alert("run")} className="cursor-pointer text-white bg-red-500 w-280" >
                             Delect
                        </Button> */}
                        </div>
                        ))}
                         
                    </div>
                    <div className="flex justify-between items-center mt-8">
                        <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
                        <Button
                            type="primary"
                            icon={<ShoppingCartOutlined />}
                            size="large"
                            onClick={handleBuyNow}
                            className="bg-green-600"
                        >
                            Buy Now
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
