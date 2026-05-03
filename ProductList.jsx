import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

function ProductList({ onHomeClick }) {

    const dispatch = useDispatch();

    // ✅ Redux cart data
    const cartItems = useSelector((state) => state.cart.items);

    // ✅ Total cart count
    const totalItems = cartItems.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters harmful toxins.",
                    cost: "$12"
                }
            ]
        },
        {
            category: "Aromatic Plants",
            plants: [
                {
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba",
                    description: "Calming scent used in aromatherapy.",
                    cost: "$20"
                },
                {
                    name: "Mint",
                    image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
                    description: "Refreshing aroma.",
                    cost: "$12"
                }
            ]
        }
    ];

    // ✅ Add to Cart
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));

        setAddedToCart((prev) => ({
            ...prev,
            [plant.name]: true
        }));
    };

    const handleCartClick = () => {
        setShowCart(true);
    };

    const handleContinueShopping = () => {
        setShowCart(false);
    };

    return (
        <div>

            {/* NAVBAR */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
                background: "#4CAF50",
                color: "white"
            }}>
                <h2>🌿 Paradise Nursery</h2>

                {/* ✅ CART COUNT (Task 4) */}
                <button onClick={handleCartClick}>
                    🛒 ({totalItems})
                </button>
            </div>

            {/* PRODUCT / CART VIEW */}
            {!showCart ? (
                <div className="product-grid">

                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2>{category.category}</h2>

                            <div className="plants-container">
                                {category.plants.map((plant, i) => (
                                    <div key={i} className="plant-card">

                                        <img src={plant.image} alt={plant.name} />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.description}</p>
                                        <p>{plant.cost}</p>

                                        <button
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]}
                                        >
                                            {addedToCart[plant.name]
                                                ? "Added to Cart"
                                                : "Add to Cart"}
                                        </button>

                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}

                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}

        </div>
    );
}

export default ProductList;
