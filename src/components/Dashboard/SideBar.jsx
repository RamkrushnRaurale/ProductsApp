import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import circleHome from "../Assets/Images/circleHome.png";
import circleAboutUs from "../Assets/Images/circleAboutUs.png";
import circleContact from "../Assets/Images/circleContact.jpg";
import circleServices from "../Assets/Images/circleServices.jpg";
import CircleQuestion from "../Assets/Images/CircleQuestion.png";
import LogoImg from "../Assets/Images/images.png";
import searchImg from "../Assets/Images/search.jpg";
import cartimg from "../Assets/Images/ShppingCart.png"
import "./SideBar.css";
import Footer from "./Footer";
import Slider from "./Slider";
import Products from "../Products/Products";
import { useSelector } from "react-redux";

function SideBar() {
    const carts = useSelector((store) => store.cart.item);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const filterCount = carts.reduce((acc, curr) => {
            acc = curr.quantity;
            setCount(acc);
        }, 0)
    }, [carts])


    const [collapsed, setCollapsed] = useState(false);

    const handleToggleSidebar = () => setCollapsed((prev) => !prev);

    return (
        <div className="wrapper fixed-top">
            {/* Sidebar */}
            <aside id="sidebar" className={collapsed ? "collapsed" : ""}>
                <ul className="sidebar-nav">
                    <li className="sidebar-item">
                        <a className="sidebar-link" href="//">
                            <img src={LogoImg} alt="" />
                            <span className="sidebar-text">CodeRama</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a className="sidebar-link" href="//">
                            <img src={circleHome} alt="" />
                            <span className="sidebar-text"> <Link to={'/home'}>Home</Link></span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a className="sidebar-link" href="//">
                            <img src={circleAboutUs} alt="" />
                            <span className="sidebar-text">About Us</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a className="sidebar-link" href="//">
                            <img src={circleContact} alt="" />
                            <span className="sidebar-text">Contact</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a className="sidebar-link" href="//">
                            <img src={circleServices} alt="" />
                            <span className="sidebar-text">Services</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a className="sidebar-link" href="//">
                            <img src={CircleQuestion} alt="" />
                            <span className="sidebar-text">FAQs</span>
                        </a>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <div className={`main ${collapsed ? "main-collapsed" : ""}`}>
                <nav className="navbar navbar-light px-3 border-bottom d-flex justify-content-between align-items-center">
                    {/* Sidebar toggle */}
                    <button style={{ outline: "none" }}
                        className="btn"
                        onClick={handleToggleSidebar}
                    >
                        ☰
                    </button>

                    {/* Right side (search + logout) */}
                    <div className="d-flex align-items-center ms-auto">
                        {/* Static search bar */}
                        <div className="nav-search me-3">
                            <div className="search-wrap">
                                <div className="search-input">
                                    <img src={searchImg} alt="Search" className="search-icon" />
                                    <input type="search" placeholder="Search..." />
                                </div>
                            </div>
                        </div>

                        <div style={{ position: 'relative', width: '100px' }}><button className="cart-button"><img src={cartimg}></img></button>
                            <span className="msg">{count > 0 ? count : ""}</span></div>

                        {/* Logout button */}
                        <Link to="/SignIn">
                            <button
                                style={{ boxShadow: "0px 0px 5px black" }}
                                className="btn"
                                onClick={() =>
                                    alert("Logging out — implement your logout flow here")
                                }
                            >
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </button>
                        </Link>
                    </div>
                </nav>

                {/* Content area (scroll only here) */}
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
