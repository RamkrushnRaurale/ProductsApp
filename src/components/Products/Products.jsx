import React, { useEffect, useState, useMemo } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { increamentCart, decreamentCart } from "../cart/cartSlice";

const Products = () => {
    const carts = useSelector((store) => store.cart.item);
    const dispatch = useDispatch();

    const [productsByCategory, setProductsByCategory] = useState({});

    // Build lookup table for cart counts (fast access)
    const cartLookup = useMemo(() => {
        const map = {};
        carts.forEach((item) => {
            map[item.productId] = item.quantity;
        });
        return map;
    }, [carts]);

    // Group products by category
    const groupByCategory = (arr) => {
        const grouped = {};
        arr.forEach((product) => {
            if (!grouped[product.category]) grouped[product.category] = [];
            grouped[product.category].push(product);
        });
        return grouped;
    };

    // Fetch data from API
    const fetchData = async () => {
        try {
            const response = await fetch("https://dummyjson.com/products");
            const data = await response.json();
            const grouped = groupByCategory(data.products);
            setProductsByCategory(grouped);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddToCart = (id) => {
        dispatch(increamentCart({ productId: id, quantity: 1 }));
    };

    const handleDecrToCart = (id) => {
        dispatch(decreamentCart({ productId: id, quantity: 1 }));
    };

    return (
        <div className="container">
            {Object.entries(productsByCategory).map(([categoryName, products]) => (
                <div className="category-block" key={categoryName}>
                    <h1 className="category-title">{categoryName}</h1>
                    <div className="category-group">
                        {products.map((product) => {
                            const count = cartLookup[product.id] || 0;


                            return (
                                <div className="card" key={product.id}>
                                    <img
                                        className="card-image"
                                        src={product.thumbnail}
                                        alt={product.title}
                                    />
                                    <div className="card-details">
                                        <div className="title">
                                            <span style={{ marginBottom: "5px" }}>{product.title}</span>
                                            <div className="total-rating">
                                                <span className="rating">{product.rating} ★</span>
                                            </div>
                                            <span>Price : {product.price} Rs</span>

                                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                                {count > 0 && (
                                                    <>
                                                        <button style={btnStyle} onClick={() => handleDecrToCart(product.id)}>
                                                            -
                                                        </button>
                                                        <span>{count}</span>
                                                    </>
                                                )}
                                                <button style={btnStyle} onClick={() => handleAddToCart(product.id)}>
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

const btnStyle = {
    width: "40px",
    borderRadius: "5px",
    border: "none",
    background: "white",
    color: "black",
    boxShadow: "0 0 5px grey",
};

export default Products;
