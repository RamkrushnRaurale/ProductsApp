import React, { useEffect, useState, useMemo } from "react";

import "./Products.css";

import { useSelector, useDispatch } from "react-redux";

import {
    increamentCart,
    decreamentCart,
} from "../cart/cartSlice";

const Products = () => {
    const carts = useSelector((store) => store.cart.item);

    const dispatch = useDispatch();

    const [productsByCategory, setProductsByCategory] =
        useState({});

    // Fast lookup
    const cartLookup = useMemo(() => {
        const map = {};

        carts.forEach((item) => {
            map[item.productId] = item.quantity;
        });

        return map;
    }, [carts]);

    // Group Products
    const groupByCategory = (arr) => {
        const grouped = {};

        arr.forEach((product) => {
            if (!grouped[product.category]) {
                grouped[product.category] = [];
            }

            grouped[product.category].push(product);
        });

        return grouped;
    };

    // Fetch API
    const fetchData = async () => {
        try {
            const response = await fetch(
                "https://dummyjson.com/products"
            );

            const data = await response.json();

            const grouped = groupByCategory(data.products);

            setProductsByCategory(grouped);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            {Object.entries(productsByCategory).map(
                ([categoryName, products]) => (
                    <div
                        className="category-block"
                        key={categoryName}
                    >
                        <h1 className="category-title">
                            {categoryName}
                        </h1>

                        <div className="category-group">
                            {products.map((product) => {
                                const count =
                                    cartLookup[product.id] || 0;

                                return (
                                    <div className="card" key={product.id}>
                                        <img
                                            className="card-image"
                                            src={product.thumbnail}
                                            alt={product.title}
                                        />

                                        <div className="card-details">
                                            <div className="title">
                                                <span>{product.title}</span>

                                                <div className="total-rating">
                                                    <span className="rating">
                                                        {product.rating} ★
                                                    </span>
                                                </div>

                                                <span>
                                                    Price : ₹ {product.price}
                                                </span>

                                                {/* Add Cart */}
                                                {count > 0 ? (
                                                    <div className="qty-box">
                                                        <button
                                                            onClick={() =>
                                                                dispatch(
                                                                    decreamentCart({
                                                                        productId:
                                                                            product.id,
                                                                        quantity: 1,
                                                                    })
                                                                )
                                                            }
                                                        >
                                                            -
                                                        </button>

                                                        <span>{count}</span>

                                                        <button
                                                            onClick={() =>
                                                                dispatch(
                                                                    increamentCart({
                                                                        productId:
                                                                            product.id,
                                                                        quantity: 1,
                                                                        title:
                                                                            product.title,
                                                                        price:
                                                                            product.price,
                                                                        thumbnail:
                                                                            product.thumbnail,
                                                                    })
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        className="add-btn"
                                                        onClick={() =>
                                                            dispatch(
                                                                increamentCart({
                                                                    productId:
                                                                        product.id,
                                                                    quantity: 1,
                                                                    title:
                                                                        product.title,
                                                                    price:
                                                                        product.price,
                                                                    thumbnail:
                                                                        product.thumbnail,
                                                                })
                                                            )
                                                        }
                                                    >
                                                        Add To Cart
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default Products;