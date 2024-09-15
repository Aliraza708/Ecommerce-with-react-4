
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { CartContext } from "../ContextApi/CartIncrement";

function ProductDetail() {
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState({});
    const { setCart, cart } = useContext(CartContext);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProductDetail(data));
    }, [id]);

    const { thumbnail, title, description, price, rating } = productDetail;

    const addToCart = () => {
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProduct = cartItems.find((item) => item.id === productDetail.id);

        if (existingProduct) {
            alert("This product is already in your cart!");
        } else {
            // Add product to cart
            cartItems.push({
                id: productDetail.id,
                title: productDetail.title,
                price: productDetail.price,
                thumbnail: productDetail.thumbnail,
                quantity: 1,
            });

            localStorage.setItem("cart", JSON.stringify(cartItems));
            setCart(prevCount => {
                const newCount = prevCount + 1;
                localStorage.setItem("cartCount", JSON.stringify(newCount));
                return newCount;
            });

            alert(`${title} has been added to your cart!`);
        }
    };

    return (
        <div className="max-w-5xl mt-3 mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
                        <p className="text-xl font-semibold text-gray-600 mt-2">${price}</p>
                        <div className="flex items-center mt-4">
                            <span className="text-yellow-500">★★★★☆</span>
                            <p className="ml-2 text-gray-500">({rating} reviews)</p>
                        </div>
                        <p className="text-gray-600 mt-6 leading-relaxed">{description}</p>
                    </div>
                    <div className="flex gap-4 mt-8">
                        <Button
                            onClick={addToCart}
                            type="primary"
                            icon={<ShoppingCartOutlined />}
                            className="bg-blue-600"
                            size="large"
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
