import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import circleHome from "../Assets/Images/circleHome.png";
import circleAboutUs from "../Assets/Images/circleAboutUs.png";
import circleContact from "../Assets/Images/circleContact.jpg";
import circleServices from "../Assets/Images/circleServices.jpg";
import CircleQuestion from "../Assets/Images/CircleQuestion.png";
import LogoImg from "../Assets/Images/images.png";
import searchImg from "../Assets/Images/search.jpg";
import cartimg from "../Assets/Images/ShppingCart.png";

import "./SideBar.css";

import Footer from "./Footer";
import Slider from "./Slider";
import Products from "../Products/Products";

import { useSelector, useDispatch } from "react-redux";

import {
    increamentCart,
    decreamentCart,
} from "../cart/cartSlice";

function SideBar() {

    const carts = useSelector((store) => store.cart.item);

    const dispatch = useDispatch();

    // Sidebar
    const [collapsed, setCollapsed] = useState(false);

    // Cart Popup
    const [showCart, setShowCart] = useState(false);

    const handleToggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    // Total Cart Count
    const count = useMemo(() => {
        return carts.reduce((acc, curr) => {
            return acc + curr.quantity;
        }, 0);
    }, [carts]);

    // Total Price
    const totalPrice = useMemo(() => {
        return carts.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
    }, [carts]);

    // Discount
    const discount = useMemo(() => {
        return Math.floor(totalPrice * 0.2);
    }, [totalPrice]);

    // Platform Fee
    const platformFee = 11;

    // Final Amount
    const finalAmount =
        totalPrice - discount + platformFee;

    return (
        <div className="wrapper fixed-top">

            {/* Sidebar */}
            <aside
                id="sidebar"
                className={collapsed ? "collapsed" : ""}
            >

                <ul className="sidebar-nav">

                    <li className="sidebar-item">

                        <Link
                            className="sidebar-link"
                            to="//"
                        >

                            <img
                                src={LogoImg}
                                alt=""
                            />

                            <span className="sidebar-text">
                                CodeRama
                            </span>

                        </Link>

                    </li>

                    <li className="sidebar-item">

                        <Link
                            className="sidebar-link"
                            to={"/Dashboard"}
                        >

                            <img
                                src={circleHome}
                                alt=""
                            />

                            <span className="sidebar-text">

                                Home

                            </span>

                        </Link>

                    </li>

                    <li className="sidebar-item">

                        <Link className="sidebar-link" to="//">

                            <img
                                src={circleAboutUs}
                                alt=""
                            />

                            <span className="sidebar-text">
                                About Us
                            </span>

                        </Link>

                    </li>

                    <li className="sidebar-item">

                        <Link
                            className="sidebar-link"
                            to="//"
                        >

                            <img
                                src={circleContact}
                                alt=""
                            />

                            <span className="sidebar-text">
                                Contact
                            </span>

                        </Link>

                    </li>

                    <li className="sidebar-item">

                        <Link
                            className="sidebar-link"
                            to="//"
                        >

                            <img
                                src={circleServices}
                                alt=""
                            />

                            <span className="sidebar-text">
                                Services
                            </span>

                        </Link>

                    </li>

                    <li className="sidebar-item">

                        <Link
                            className="sidebar-link"
                            to="//"
                        >

                            <img
                                src={CircleQuestion}
                                alt=""
                            />

                            <span className="sidebar-text">
                                FAQs
                            </span>

                        </Link>

                    </li>

                </ul>

            </aside>

            {/* Main */}
            <div
                className={`main ${collapsed
                    ? "main-collapsed"
                    : ""
                    }`}
            >

                {/* Navbar */}
                <nav
                    className="navbar navbar-light px-3 border-bottom d-flex justify-content-between align-items-center"
                >

                    {/* Sidebar Toggle */}
                    <button
                        style={{
                            outline: "none",
                        }}
                        className="btn"
                        onClick={
                            handleToggleSidebar
                        }
                    >
                        ☰
                    </button>

                    {/* Right Side */}
                    <div
                        className="d-flex align-items-center ms-auto"
                    >

                        {/* Search */}
                        <div
                            className="nav-search me-3"
                        >

                            <div className="search-wrap">

                                <div className="search-input">

                                    <img
                                        src={searchImg}
                                        alt="Search"
                                        className="search-icon"
                                    />

                                    <input
                                        type="search"
                                        placeholder="Search..."
                                    />

                                </div>

                            </div>

                        </div>

                        {/* Cart */}
                        <div
                            style={{
                                position:
                                    "relative",
                                width: "100px",
                            }}
                        >

                            <button
                                className="cart-button"
                                onClick={() =>
                                    setShowCart(
                                        !showCart
                                    )
                                }
                            >

                                <img
                                    src={cartimg}
                                    alt="cart"
                                    style={{
                                        width: "55px",
                                        height: "55px",
                                    }}
                                />

                            </button>

                            {/* Cart Count */}
                            <span className="msg">
                                {count > 0
                                    ? count
                                    : ""}
                            </span>

                        </div>

                        {/* Logout */}
                        <Link to="/SignIn">

                            <button
                                style={{
                                    boxShadow:
                                        "0px 0px 5px black",
                                }}
                                className="btn"
                                onClick={() =>
                                    alert(
                                        "Logging out"
                                    )
                                }
                            >

                                <i className="fas fa-sign-out-alt"></i>

                                Logout

                            </button>

                        </Link>

                    </div>

                </nav>

                {/* Cart Popup */}
                {
                    showCart && (

                        <div className="cart-container">

                            <h2>
                                My Cart
                            </h2>

                            {
                                carts.length === 0 ? (

                                    <p>
                                        Cart Empty
                                    </p>

                                ) : (

                                    <>
                                        {
                                            carts.map(
                                                (
                                                    item
                                                ) => (

                                                    <div
                                                        className="cart-item"
                                                        key={
                                                            item.productId
                                                        }
                                                    >

                                                        <img
                                                            src={
                                                                item.thumbnail
                                                            }
                                                            alt=""
                                                        />

                                                        <div
                                                            className="cart-info"
                                                        >

                                                            <h4>
                                                                {
                                                                    item.title
                                                                }
                                                            </h4>

                                                            <p>
                                                                ₹{" "}
                                                                {
                                                                    item.price
                                                                }
                                                            </p>

                                                            <div
                                                                className="qty-box"
                                                            >

                                                                {/* Minus */}
                                                                <button
                                                                    onClick={() =>
                                                                        dispatch(
                                                                            decreamentCart(
                                                                                {
                                                                                    productId:
                                                                                        item.productId,
                                                                                    quantity: 1,
                                                                                }
                                                                            )
                                                                        )
                                                                    }
                                                                >
                                                                    -
                                                                </button>

                                                                <span>
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </span>

                                                                {/* Plus */}
                                                                <button
                                                                    onClick={() =>
                                                                        dispatch(
                                                                            increamentCart(
                                                                                {
                                                                                    productId:
                                                                                        item.productId,
                                                                                    quantity: 1,
                                                                                    title:
                                                                                        item.title,
                                                                                    price:
                                                                                        item.price,
                                                                                    thumbnail:
                                                                                        item.thumbnail,
                                                                                }
                                                                            )
                                                                        )
                                                                    }
                                                                >
                                                                    +
                                                                </button>

                                                            </div>

                                                        </div>

                                                    </div>

                                                )
                                            )
                                        }

                                        {/* Price Details */}
                                        <div className="price-details">

                                            <h3>
                                                Price Details
                                            </h3>

                                            <div className="price-row">

                                                <span>
                                                    Price ({count} items)
                                                </span>

                                                <span>
                                                    ₹ {totalPrice}
                                                </span>

                                            </div>

                                            <div className="price-row green">

                                                <span>
                                                    Discount
                                                </span>

                                                <span>
                                                    - ₹ {discount}
                                                </span>

                                            </div>

                                            <div className="price-row">

                                                <span>
                                                    Platform Fee
                                                </span>

                                                <span>
                                                    ₹ {platformFee}
                                                </span>

                                            </div>

                                            <hr />

                                            <div className="price-row total">

                                                <span>
                                                    Total Amount
                                                </span>

                                                <span>
                                                    ₹ {finalAmount}
                                                </span>

                                            </div>

                                            <div className="save-box">

                                                🎉 You'll save ₹
                                                {
                                                    discount -
                                                    platformFee
                                                }{" "}
                                                on this order!

                                            </div>

                                        </div>
                                    </>
                                )
                            }

                        </div>

                    )
                }

                {/* Content */}
                <div className="content-area">

                    <div className="scroll-area">

                        <Slider />

                        <Products />

                        <Footer />

                    </div>

                </div>

            </div>

        </div>
    );
}

export default SideBar;